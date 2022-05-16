import {
  applyMiddleware,
  combineReducers,
  createStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from './features/app/appSlice';
import areaAmministrativaReducer from './features/areaAmministrativa/areaAmministrativaSlice';
import questionarioReducer from './features/areaAmministrativa/questionario/questionarioSlice';
import modalReducer from './features/modal/modalSlice';
import notificationReducer from './features/notification/notificationSlice';
import programmaReducer from './features/areaAmministrativa/programma/programmaSlice';
import userReducer from './features/user/userSlice';
import areaCittadiniReducer from './features/areaCittadini/areaCittadiniSlice';
import rolesReducer from './features/roles/rolesSlice';
import areaAmministrativaDetailReducer from './features/areaAmministrativa/detail/detailSlice';

const store = createStore(
  combineReducers({
    app: appReducer,
    areaAmministrativa: areaAmministrativaReducer,
    areaAmministrativaDetail: areaAmministrativaDetailReducer,
    areaCittadini: areaCittadiniReducer,
    modal: modalReducer,
    notification: notificationReducer,
    programma: programmaReducer,
    questionario: questionarioReducer,
    roles: rolesReducer,
    user: userReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
