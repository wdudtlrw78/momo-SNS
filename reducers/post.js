export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '모모',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'MoMo',
          },
          content: 'Test!',
        },
        {
          User: {
            nickname: 'PaPa',
          },
          content: '두근두근',
        },
      ],
    },
  ],

  imagePaths: [],
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  // 상수로 빼면 오타가 줄어든다.
  type: ADD_POST,
};

const dummyPost = {
  // 더미 데이터
  id: 2,
  content: '더미데이터 입니다.',
  User: {
    id: 1,
    nicknmae: '모모',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
