import * as types from '../utilities/types';
//@flow
import type {
  MetaType, UpdateItemsActions, RemoveItemActions, ListenToPathActions
} from '../utilities/types';
import { metaTypes } from '../utilities/types';
import { firebaseApp } from '../utilities/firebase';

export function clearData() {
  return {
    type: types.firebase.FIREBASE_RESET_DATA
  }
}

export function updateRequested(metaType: MetaType) {
  return {
    type: types.firebase.FIREBASE_UPDATE_REQUESTED,
    metaType
  }
}

export function updateRejected(metaType: MetaType, error: string) {
  return {
    type: types.firebase.FIREBASE_UPDATE_REJECTED,
    metaType,
    error
  }
}

export function updateFulfilled(metaType: MetaType) {
  return {
    type: types.firebase.FIREBASE_UPDATE_FULFILLED,
    metaType
  }
}

export function updateItem(metaType: MetaType, update: Object, path: string) {
  return updateItems(metaType, [update], [path])
}

export function updateItems(metaType: MetaType, updates: Array<Object>, paths: Array<string>) {
  console.log('updates', updates);
  console.log('paths', paths);
  return (dispatch: UpdateItemsActions => void) => {
    dispatch(updateRequested(metaType))
    const promises = []
    updates.forEach((update, index) => {
      console.log('update', update);
      const path = paths[index];
      const ref = firebaseApp.database().ref(path);
      const promise = ref.update(update);
      promises.push(promise);
    })

    return Promise.all(promises)
    .then(() => {
      dispatch(updateFulfilled(metaType))
    })
    .catch(error => {
      dispatch(updateRejected(metaType, error))
    })
  }
}

export function removeRequested(metaType: MetaType) {
  return {
    type: types.firebase.FIREBASE_REMOVE_REQUESTED,
    metaType
  }
}

export function removeRejected(metaType: MetaType, error: string) {
  return {
    type: types.firebase.FIREBASE_REMOVE_REJECTED,
    metaType,
    error
  }
}

export function removeFulfilled(metaType: MetaType) {
  return {
    type: types.firebase.FIREBASE_REMOVE_FULFILLED,
    metaType
  }
}

export function removeItem(metaType: MetaType, path: string) {
  return (dispatch: RemoveItemActions => void) => {
    dispatch(removeRequested(metaType))
    return firebaseApp.database().ref(path).remove()
    .then(() => {
      dispatch(removeFulfilled(metaType))
    })
    .catch((error) => {
      dispatch(removeRejected(metaType, error))
    })
  }
}

export function listenRequested(metaType: MetaType, ref: Object) {
  return {
    type: types.firebase.FIREBASE_LISTEN_REQUESTED,
    metaType,
    ref
  }
}

export function listenRejected(metaType: MetaType, error: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_REJECTED,
    metaType,
    error
  }
}

export function listenFulfilled(metaType: MetaType, items: Object) {
  return {
    type: types.firebase.FIREBASE_LISTEN_FULFILLED,
    metaType,
    items
  }
}

export function listenChildAdded(metaType: MetaType, id: string, value: Object) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_ADDED,
    metaType,
    id,
    value,
  }
}

export function listenChildChanged(metaType: MetaType, id: string, value: Object) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_CHANGED,
    metaType,
    id,
    value,
  }
}

export function listenChildRemoved(metaType: MetaType, id: string) {
  return {
    type: types.firebase.FIREBASE_LISTEN_CHILD_REMOVED,
    metaType,
    id,
  }
}

export function listenRemoved(metaType: MetaType, clearItems: boolean) {
  return {
    type: types.firebase.FIREBASE_LISTEN_REMOVED,
    metaType,
    clearItems
  }
}

export function removeListenerRef(state: Object, metaType: MetaType) {
  if (state && state[metaType] &&
    state[metaType].ref) {
    return state[metaType].ref.off()
  }

  //returns resolved promise
  return Promise.resolve()
}

export function listenToPath(metaType: MetaType, path: string) {
  return function (dispatch: ListenToPathActions => void, getState: () => Object) {
    //just in case we remove any existing listener
    return removeListenerRef(getState(), metaType).then(() => {
      const ref = firebaseApp.database().ref(path);
      dispatch(listenRequested(metaType, ref));

      ref.on('child_added', (snap) => {
        if (getState().firebaseReducer[metaType].inProgress) {
          return
        }
        const val: Object = snap.val()
        dispatch(listenChildAdded(metaType, snap.key, val))
      });

      ref.on('child_changed', (snap) => {
        if (getState().firebaseReducer[metaType].inProgress) {
          return
        }
        const val: Object = snap.val()
        dispatch(listenChildChanged(metaType, snap.key, val))
      });

      ref.on('child_removed', (snap) => {
        if (getState().firebaseReducer[metaType].inProgress) {
          return
        }
        dispatch(listenChildRemoved(metaType, snap.key))
      });

      return ref.once('value').then(snap => {
        //better to have an empty object then a null value if data does not
        //exist

        const val = snap.val();
        const value = val ? val : { }

        dispatch(listenFulfilled(metaType, value))
      })
      .catch(error => {
        dispatch(listenRejected(metaType, error))
      })
    })
    .catch(error => {
      console.log('error');
      console.log(error);
    });
  }
}

export function removeListener(metaType: MetaType, clearItems: boolean = false) {
  return (dispatch: ListenToPathActions => void, getState: () => Object) => {
    return removeListenerRef(getState(), metaType).then(() => {
      dispatch(listenRemoved(metaType, clearItems))
    })
  }
}

export function removeAllListeners() {
  return (dispatch: ListenToPathActions => void, getState: () => Object) => {
    const promises = Object.keys(metaTypes).map((metaType) => {
      return removeListenerRef(getState(), metaType).then(() => {
        dispatch(listenRemoved(metaType, true))
      })
    })
    return Promise.all(promises)
  }
}
