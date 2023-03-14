const express = require('express');
const app = express();
const session = require('express-session');

/**morgan 설정 */
const morgan = require('morgan');
app.use(morgan('dev')); // 로그

// express-session 설정
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUnitialized: true,
  })
);

/**client와의 통신 */
const cors = require('cors');
app.use(
  cors({
    origin: ['http://localhost:443', 'https://bandari.store'],
    credentials: true,
  })
);

const path = require('path');
/**dotenv 설정 */
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱

// DB 연결 성공 여부
const { sequelize, supplies } = require('./model/index');
// 다른 require문은 일단 생략
const ConnectDB = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('데이터베이스 연결 성공!'));
    await sequelize.sync().then(() => console.log('동기화 완료!'));
  } catch (error) {
    console.error('DB 연결 및 동기화 실패', error);
  }
};

// DB와 연결 및 동기화
ConnectDB();
const router = require('./routes/user/kakao');
const suppliesRouter = require('./routes/supplies');
const petRouter = require('./routes/pet');
const mypageRouter = require('./routes/mypage');
const roomRouter = require('./routes/room');
const pickRouter = require('./routes/pick');
const chatRouter = require('./routes/chat');

app.use('/kakao', router);
app.use('/supplies', suppliesRouter);
app.use('/pet', petRouter);
app.use('/mypage', mypageRouter);
app.use('/room', roomRouter);
app.use('/pick', pickRouter);
app.use('/chat', chatRouter);

// 소켓을 위한 서버 설정
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    orgin: ['*'],
    method: ['GET', 'POST'],
    credentials: true,
  },
});

const moment = require('moment');
// 접속한 유저, 방 번호, 방
let loginUser = '';
let roomId = '';
let rooms = [];

io.on('connection', (socket) => {
  // 방 입장 시 로그인 한 유저와 방이름
  socket.on('loginUser', (data) => {
    loginUser = data.user;
    roomId = data.roomId;

    // rooms에 있으면 roomId 추가 xx
    if (!rooms.includes(roomId)) {
      rooms.push(roomId);
    }
    socket.join(roomId);
  });

  // 메시지 데이터
  socket.on('sendMsg', (data) => {
    console.log('메시지 데이터', data);
    io.to(roomId).emit('newMsg', data);
  });

  // x버튼으로 채팅방 나가기
  socket.on('disconnect', () => {
    console.log('rooms체크', rooms);
    rooms.forEach((el, idx) => {
      if (el == roomId) {
        rooms.splice(idx, 1);
      }
    });
    console.log(`${loginUser}가 ${roomId}방을 나갔습니다.`);
    console.log('delete 후의 rooms', rooms);
  });
});

http.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} server running`);
});
