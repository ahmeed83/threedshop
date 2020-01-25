import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICartItem, defaultValue } from 'app/shared/model/cart-item.model';

export const ACTION_TYPES = {
  FETCH_CARTITEM_LIST: 'cartItem/FETCH_CARTITEM_LIST',
  FETCH_CARTITEM: 'cartItem/FETCH_CARTITEM',
  CREATE_CARTITEM: 'cartItem/CREATE_CARTITEM',
  UPDATE_CARTITEM: 'cartItem/UPDATE_CARTITEM',
  DELETE_CARTITEM: 'cartItem/DELETE_CARTITEM',
  RESET: 'cartItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICartItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CartItemState = Readonly<typeof initialState>;

// Reducer

export default (state: CartItemState = initialState, action): CartItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CARTITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CARTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CARTITEM):
    case REQUEST(ACTION_TYPES.UPDATE_CARTITEM):
    case REQUEST(ACTION_TYPES.DELETE_CARTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CARTITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CARTITEM):
    case FAILURE(ACTION_TYPES.CREATE_CARTITEM):
    case FAILURE(ACTION_TYPES.UPDATE_CARTITEM):
    case FAILURE(ACTION_TYPES.DELETE_CARTITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CARTITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CARTITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_CARTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CARTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/cart-items';

// Actions

export const getEntities: ICrudGetAllAction<ICartItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CARTITEM_LIST,
  payload: axios.get<ICartItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICartItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CARTITEM,
    payload: axios.get<ICartItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICartItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CARTITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICartItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CARTITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICartItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CARTITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
