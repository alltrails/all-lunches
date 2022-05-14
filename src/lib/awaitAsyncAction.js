import { race, take } from 'redux-saga/effects';

export default function* awaitAsyncAction(asyncAction) {
  return yield race([take(asyncAction.SUCCESS), take(asyncAction.ERROR)]);
}
