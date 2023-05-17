package com.sevenight.coldcrayon.board.controller;
import com.sevenight.coldcrayon.auth.dto.UserDto;
import com.sevenight.coldcrayon.auth.service.AuthService;
import com.sevenight.coldcrayon.auth.service.TokenService;
import com.sevenight.coldcrayon.board.dto.*;
import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.board.service.BoardService;
import com.sevenight.coldcrayon.user.entity.User;
import com.sevenight.coldcrayon.user.repository.UserRepository;
import com.sevenight.coldcrayon.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    private final UserRepository userRepository;
    private final TokenService tokenservice;

    private final AuthService authService;

    //게시글 작성
    @PostMapping("/create")
    public ResponseEntity<?> saveArticle(@RequestHeader String Authorization, @RequestBody CreateArticleRequest request) {
        // 1. 요청 바디가 비어있는 경우
        if (request == null || request.getTitle() == null || request.getContent() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "title, content 를 넣어주세요"));
        }

        try {
//            User finduser = userRepository.findById(1L).get();
            String token = HeaderUtil.getAccessTokenString(Authorization);
            String email = tokenservice.getEmail(token);
            User finduser = userRepository.findByUserEmail(email);
            Board board = new Board();
            board.setBoardTitle(request.getTitle());
            board.setBoardContent(request.getContent());
            board.setUserIdx(finduser);
            int id = boardService.createArticle(board);
            CreateArticleResponse response = new CreateArticleResponse(id, request.getTitle(), request.getContent(), board.getBoardCreateTime(), board.getBoardUpdateTime());
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            // 2. 요청한 사용자 정보를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message","User not found."));
        } catch (Exception e) {
            // 3. 그 외 예외 발생시
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message","Server error."));
        }

    }

    //게시글 업데이트
    @PutMapping("/update")
    public ResponseEntity<?> updateArticle(@RequestHeader String Authorization, @RequestParam(name = "boardId") int boardId) {

        try {
            String token = HeaderUtil.getAccessTokenString(Authorization);
            String email = tokenservice.getEmail(token);
            User finduser = userRepository.findByUserEmail(email);

            Board board = boardService.findById(boardId).get();

            // 해당 게시글을 작성한 유저와 현재 로그인한 유저가 다른 경우, 업데이트 불가능
            if (!board.getUserIdx().equals(finduser)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "글을 작성한 사용자가 아닙니다"));
            }
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime lastUpdateTime = board.getBoardUpdateTime();
            Duration duration = Duration.between(lastUpdateTime, currentTime);
            if (duration.toMinutes() < 10) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "게시글을 작성한지 10분이 지나지 않았습니다."));

            }
            board.setBoardUpdateTime(LocalDateTime.now());
            int id = boardService.createArticle(board);
            return ResponseEntity.ok(new CreateArticleResponse(id, board.getBoardTitle(), board.getBoardContent(), board.getBoardCreateTime(), board.getBoardUpdateTime()));
        } catch (NoSuchElementException e) {
            // 2. 요청한 게시글 정보를 찾을 수 없는 경우
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "게시글을 찾을 수 없습니다."));
        } catch (Exception e) {
            // 3. 그 외 예외 발생시
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "서버 에러 입니다"));
        }
    }

    //게시글 페이징
    @GetMapping
    public ResponseEntity<?> getArticles(
            @RequestParam(name = "page", defaultValue = "0") int pageNum,
            @RequestParam(name = "size", defaultValue = "5") int pageSize
    ) {
        if (pageNum < 0 || pageSize <= 0) {
            return ResponseEntity.badRequest().body("페이지번호, 페이지 사이즈가 유효하지 않습니다.");
        }
        Page<BoardDetailDto> articles = boardService.pageBoard(pageNum, pageSize);
        return ResponseEntity.ok().body(articles);
    }

    @DeleteMapping("/delete/{boardIdx}")
    public ResponseEntity<?> deleteBoard(@PathVariable Integer boardIdx) {
        String res = boardService.deleteBoard(boardIdx);
        return ResponseEntity.ok().body(res);
    }


    //게시글 전체조회
//    @GetMapping("/api/board")
//    public Result articles() {
//        List<Board> findArticles = boardService.findArticles();
//        List<ArticleDto> collect = findArticles.stream()
//                .map(m -> new ArticleDto(m.getBoardId(), m.getBoardTitle(), m.getBoardContent(), m.getBoardCreateTime(), m.getBoardUpdateTime())
//                ).collect(Collectors.toList());
//
//        return new Result(collect.size(), collect);
//
//    }

}
