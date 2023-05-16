import { useState, forwardRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { memberAPI } from '@/api/api';
import { Button } from '../ui/Button';
import { useAppDispatch } from '@/store/thunkhook';
import { setMypage } from '@/store/slice/mypageSlice';
//mui 관련 import
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(
  props: { children: React.ReactElement },
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          sx={{
            position: 'absolute',
            paddingBottom: 1,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ChangeName() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  let check_spe =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω½⅓⅔¼¾⅛⅜⅝⅞¹²³⁴ⁿ₁₂₃₄ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊＄％￦Ｆ′″℃Å￠￡￥¤℉‰?㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎙㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆＋－＜＝＞±×÷≠≤≥∞∴♂♀∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∮∑∏＂（）［］｛｝‘’“”〔〕〈〉《》「」『』【】！＇，．￣：；‥…¨〃­―∥＼∼´～ˇ˘˝˚˙¸˛¡¿ː＃＆＊＠§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡?ªⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓖⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯㉠㉡㉢㉣㉭㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂%&\\\=\(\'\"]/gi; // 특수문자 제거
  let check_str = /[ㄱ-ㅎㅏ-ㅣ]/gi; // 자음, 모음 제거
  let space = /\s/g; // 공백 제거
  const ClickOpen = () => {
    setOpen(true);
  };
  const ClickClose = () => {
    setOpen(false);
    setText('');
  };
  const ChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const errAlert = () => {
    Swal.fire({
      text: '닉네임을 확인해주세요',
    });
  };
  const Validation = () => {
    if (check_spe.test(text) === true) {
      return '특수문자는 사용할 수 없습니다.';
    } else if (check_str.test(text) === true) {
      return '자음 혹은 모음만 사용할 수 없습니다';
    } else if (space.test(text) === true) {
      return '공백은 사용할 수 없습니다.';
    } else if (text.length > 8) {
      return '글자수가 초과되었습니다.';
    }
  };

  return (
    <div>
      <Button
        px={6}
        py={2}
        rounded="lg"
        color="bg-apple-green"
        className="hover:animate-pulse text-xs lg:text-xl sm:text-sm"
        onClick={() => {
          ClickOpen();
        }}
      >
        닉네임 변경
      </Button>
      <Dialog
        onClose={ClickClose}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            width: '30vw',
            height: '40vh',
            backgroundColor: 'rgba(255, 255, 255)',
          },
        }}
      >
        <CustomDialogTitle onClose={ClickClose} />
        <DialogContent>
          <ChangeDiv>
            <div>바꿀 닉네임을 입력해주세요</div>
            <div className="flex flex-row gap-4 w-4/5 items-center">
              <TextField
                placeholder="닉네임을 입력해주세요"
                variant="standard"
                sx={{ width: '90%' }}
                onChange={ChangeText}
                value={text}
                error={Validation() ? true : false}
                helperText={Validation() ? Validation() : ''}
                inputProps={{
                  maxLength: 12,
                  style: { fontFamily: 'CookieRun' },
                }}
              />
              <div
                className={`${
                  text.length > 10 ? 'text-apple-red' : 'text-apple-green '
                } text-base`}
              >
                {text.length}/10
              </div>
            </div>

            <Button
              px={6}
              py={2}
              rounded="lg"
              color="bg-main-green"
              onClick={() => {
                const changed = async () => {
                  await memberAPI
                    .changeName(text)
                    .then((request) => {
                      console.log('성공');
                      memberAPI
                        .getUserInfo()
                        .then((request) => {
                          console.log(request.data);
                          dispatch(setMypage(request.data.body));
                          ClickClose();
                        })
                        .catch((e) => console.log(e));
                    })
                    .catch((err) => console.log(err));
                };
                if (
                  check_spe.test(text) === false &&
                  check_str.test(text) === false &&
                  space.test(text) === false &&
                  text.length < 11 &&
                  text.length !== 0
                ) {
                  changed();
                } else {
                  alert('조건에 부합하지 않은 닉네임입니다.');
                }
              }}
            >
              변경하기
            </Button>
          </ChangeDiv>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const ChangeDiv = tw.div`
  flex
  flex-col
  justify-between
  items-center
  text-3xl
  w-full
  h-full
  `;
const ImageDiv = tw.div`
  h-16
  w-72
  relative
`;
