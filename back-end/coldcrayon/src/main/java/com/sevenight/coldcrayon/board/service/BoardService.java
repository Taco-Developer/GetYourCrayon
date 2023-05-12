package com.sevenight.coldcrayon.board.service;

import com.sevenight.coldcrayon.board.entity.Board;
import com.sevenight.coldcrayon.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    //게시글 아이디로 찾기
    public Optional<Board> findById(int id) {
        return boardRepository.findById(id);
    }

    //게시글 작성, 업데이트
    public int createArticle(Board board) {
        boardRepository.save(board);
        return board.getBoardId();
    }

    //게시글 전체조회
    public List<Board> findArticles() {
        return boardRepository.findAll();
    }

    //게시글 페이징
    public Page<Board> getArticles(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("boardUpdateTime").descending());
        return boardRepository.findAll(pageable);
    }

    public String deleteBoard(Integer boardIdx) {
        Optional<Board> findBoard = boardRepository.findById(boardIdx);
        if (findBoard.isPresent()) {
            Board board = findBoard.get();
            boardRepository.delete(board);
        } else {
            return "잘못된 삭제 요청 입니다";
        }

        return "게시글" + boardIdx + "가 지워졌습니다.";
    }
}
