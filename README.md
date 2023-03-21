# 🦮🐈<a href="http://43.201.83.209:8080/">반다리(bandari)</a>
> 반려동물 용품을 달리 쓰는 이웃

## 서비스 소개
반려동물 용품을 중고거래할 수 있는 사이트입니다. 반려 동물이 금방 커버리거나, 용품을 마음에 안 들어 할 때, 
저렴하게 새로운 물건을 구매 혹은 나눌 수 있는 기회를 만들기 위해 이 프로젝트르 기획하게 되었습니다. 내가 로그인한
위치 정보를 가져와 위치 기반으로 이웃들과 채팅으로 연락해 용품을 나눌 수 있습니다.


## 🛠️ Stacks 
---
![Node.js](https://img.shields.io/badge/-Node.js-%23339933)
![Express.js](https://img.shields.io/badge/-Expess.js-%23000000)
![Sequelize](https://img.shields.io/badge/-Sequelize-%2352B0E7)
![MySql](https://img.shields.io/badge/-Mysql-%234479A1)
![AWS(EC2)](https://img.shields.io/badge/-AWS(EC2)-%23232F3E)
![Nginx](https://img.shields.io/badge/-Nginx-%23009639)
![Ubuntu](https://img.shields.io/badge/-Ubuntu-%23E95420)

![JavaScript](https://img.shields.io/badge/-JavaScript-%23F7DF1E)
![React](https://img.shields.io/badge/-React-%23117ACA)
![Axios](https://img.shields.io/badge/-Axios-%235A29E4)
![Socket.io](https://img.shields.io/badge/-Socket.io-%23%23010101)

![Github](https://img.shields.io/badge/-Github-%23181717)
![Pigma](https://img.shields.io/badge/-Pigma-%23F24E1E)
![Notion](https://img.shields.io/badge/-Notion-%23000000)

---
## 👍 주요 기능 

### ⭐️ 판매페이지 & 채팅페이지
- 위치 기준으로 판매용품 보여주고, 강아지, 고양이 필터로 각각 동물에 맞는 용품들 보여주기
- 좋아요 표시
- 마음에 드는 용품에 채팅으로 연락하기

### ⭐️ 회원 관련 및 펫 관련
- 카카오로그인으로만 로그인 구현, 펫 정보 추가

---
## 📌 아키텍쳐

### 디렉토리 구조
```bash
├── README.md
├── package-lock.json
├── package.json
├── node_modules
├── .prettierrc
├── .vscode
│   └── setting.json
├── .env
├── server : Server(Backend)
│   ├── server.js : node로 실행시키는 상단 server.js
│   ├── config 
│   │   └── config.js
│   ├── controller 
│   │   ├── chat.js
│   │   ├── login.js
│   │   ├── mypage.js
│   │   ├── pet.js
│   │   ├── pick.js
│   │   ├── room.js
│   │   └── supplies.js
│   ├── model : sequelize model 
│   │   ├── chat.js
│   │   ├── img.js
│   │   ├── index.js
│   │   ├── pet.js
│   │   ├── pick.js
│   │   ├── room.js
│   │   ├── supplies.js
│   │   └── user.js
│   ├── routes  
│   │   ├── kakao.js
│   │   ├── chat.js
│   │   ├── mypage.js
│   │   ├── pet.js
│   │   ├── pick.js
│   │   ├── room.js
│   │   └── supplies.js
├── client : Client(Frontend)
│   ├── build : 배포할 build 파일
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules
│   ├── .env : 클라이언트 단 .env 파일
│   ├── public : 회원관련 페이지
│   │   ├── petImg : 펫 이미지 폴더
│   │   └── uploadImg : 반려동물 용품 이미지 폴더
│   ├── src
│   │   ├── assets : 프로젝트에서 필요한 이미지들 폴더
│   │   ├── components : 컴포넌트 모듈
│   │   │   ├── css : 컴포넌트 모듈 css
│   │   │   └── js : 컴포넌트 모듈 js
│   │   │   │   ├── GetLocation.js : 위치 정보 가져오는 함수
│   │   │   │   └── img : img 미리보기 함수
│   │   │   ├── AddressPickButton.js
│   │   │   ├── Card.js
│   │   │   ├── Category.js
│   │   │   ├── CategoryButton.js
│   │   │   ├── CategoryHamburger.js
│   │   │   ├── ChatList.js
│   │   │   ├── ChatRoom.js
│   │   │   ├── CustomCardSlider.js
│   │   │   ├── CustomPetSlider.js
│   │   │   ├── EditUserInfoModal.js
│   │   │   ├── GlobalStyle.js
│   │   │   ├── MainModal.js
│   │   │   ├── Nav.js
│   │   │   ├── NavCategoryHamburger.js
│   │   │   ├── Paging.js
│   │   │   ├── PetCard.js
│   │   │   ├── SellCategory.js
│   │   │   ├── SellForm.js
│   │   │   └── SwitchBtn 
│   │   ├── font : 폰트
│   │   ├── routes : 라우터로 이동하는 페이지들
│   │   │   └── css : 페이지 css
│   │   │   │   ├── ChatPage.module.css
│   │   │   │   ├── MainPage.module.css
│   │   │   │   ├── MyPage.module.css
│   │   │   │   ├── PetProfile.module.css
│   │   │   │   ├── SalesDetail.module.css
│   │   │   │   ├── SellForm.module.css
│   │   │   │   └── SellPage.module.css
│   │   │   ├── AppRouter.js
│   │   │   ├── ChatPage.js
│   │   │   ├── EditPetInfo.js
│   │   │   ├── ErrorPage.js
│   │   │   ├── MainPage.js
│   │   │   ├── MyPage.js
│   │   │   ├── PetProfile.js
│   │   │   ├── SalesDetail.js
│   │   │   ├── SellForm.js
│   │   │   ├── SellPage.js
│   │   │   ├── ViewKakao.js
│   │   │   └── ViewKakaoLogout.js
│   │   ├── store : redux를 위한 저장소
│   │   │   ├── index.js
│   │   │   └── module
│   │   │   │   ├── location.js
│   │   │   │   ├── pets.js
│   │   │   │   ├── sellCategorySwitch.js
│   │   │   │   ├── typeSwitch.js
│   │   │   │   └── user.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.module.css
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── Mouseposition.js
│   │   ├── reset.css
│   │   └── usePrefersReducedMotion.js


```
