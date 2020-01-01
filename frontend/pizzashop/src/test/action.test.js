import {
    addError,
    addToCart,
    changeCurrency, clearError,
    decreaseQuantity, fetchOrderHistory,
    fetchProducts,
    increaseQuantity, login, proceedToCheckOut, register,
    removeFromCart
} from "../actions";
import C from '../constant';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import {currency} from "../store/reducers";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('actions', () => {
    it('should create an action to add to cart', () => {
        const payload = {};
        const expectedAction = {
            type: C.ADD_TO_CART,
            payload
        };
        expect(addToCart(payload)).toEqual(expectedAction)
    });

    it('should create an action to remove from cart ', () => {
        const payload = {};
        const expectedAction = {
            type: C.REMOVE_FROM_CART,
            payload
        };
        expect(removeFromCart(payload)).toEqual(expectedAction)
    });

    it('should create an action to DECREASE_QUANTITY_OF_PRODUCT_FROM_CART ', () => {
        const payload = {};
        const expectedAction = {
            type: C.DECREASE_QUANTITY_OF_PRODUCT_FROM_CART,
            payload
        };
        expect(decreaseQuantity(payload)).toEqual(expectedAction)
    });

    it('should create an action to INCREASE_QUANTITY_OF_PRODUCT_FROM_CART ', () => {
        const payload = {};
        const expectedAction = {
            type: C.INCREASE_QUANTITY_OF_PRODUCT_FROM_CART,
            payload
        };
        expect(increaseQuantity(payload)).toEqual(expectedAction)
    });

    it('should create an action to CHANGE_CURRENCY ', () => {
        const payload = {};
        const expectedAction = {
            type: C.CHANGE_CURRENCY,
            payload
        };
        expect(changeCurrency(payload)).toEqual(expectedAction)
    });

    it('should create an action to ADD_ERROR ', () => {
        const payload = '';
        const expectedAction = {
            type: C.ADD_ERROR,
            payload
        };
        expect(addError(payload)).toEqual(expectedAction)
    });

    it('should create an action to CLEAR_ERROR ', () => {
        const payload = 1;
        const expectedAction = {
            type: C.CLEAR_ERROR,
            payload
        };
        expect(clearError(payload)).toEqual(expectedAction)
    });

    afterEach(() => {
        fetchMock.restore()
    });

    it('creates CHANGE_PRODUCTS  ', () => {
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: {  data: { items: ['do something'] } },
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.FETCH_PRODUCTS },
            { type: C.CHANGE_PRODUCTS, payload: ['do something'] }
        ];
        const store = mockStore({ products: [] });
        return store.dispatch(fetchProducts('')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates CANCEL_FETCHING  ', () => {
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: { data: { items: ['do something']  }},
            headers: { 'Content-Type': 'application/json' },
            throws: new Error('Some No Good Error')

        });
        const expectedActions = [
            { type: C.FETCH_PRODUCTS },
            {type: C.ADD_ERROR, payload: 'Some No Good Error' },
            { type: C.CANCEL_FETCHING },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(fetchProducts('')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('creates CHANGE_ORDER_HISTORY  ', () => {
        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: {  data: { items: ['do something'] } },
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.FETCH_ORDER_HISTORY },
            { type: C.CHANGE_ORDER_HISTORY, payload: ['do something'] }
        ];
        const store = mockStore({ orders: [] });
        return store.dispatch(fetchOrderHistory('')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates FETCH_ORDER_HISTORY  ', () => {
        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: { data: { items: ['do something']  }},
            headers: { 'Content-Type': 'application/json' },
            throws: new Error('Some No Good Error')

        });
        const expectedActions = [
            { type: C.FETCH_ORDER_HISTORY },
            {type: C.ADD_ERROR, payload: 'Some No Good Error' },
            { type: C.CANCEL_FETCHING },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(fetchOrderHistory('')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('creates POST_ORDER  ', () => {
        fetchMock.postOnce('http://localhost:8000/api/orders', {
            body: { data: {items: [ {data: [], currency: 'dollar'}] } },
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.POST_ORDER },
            { type: C.ORDER_PLACED, payload: {data: [], currency: 'dollar'} },
            { type: C.EMPTY_CART_AFTER_ORDER_SUCCESS },
            { type: C.ADD_ORDER_HISTORY, payload: {data: [], currency: 'dollar'} },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(proceedToCheckOut({cart: [], currency: 'dollar'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates POST_ORDER_FAIL ', () => {
        fetchMock.postOnce('http://localhost:8000/api/orders', {
            body: { data: [], currency: 'dollar' },

            throws: new Error('Some No Good Error')
        });
        const expectedActions = [
            { type: C.POST_ORDER },
            { type: C.ADD_ERROR, payload: 'Some No Good Error' },
            { type: C.POST_ORDER_FAIL },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(proceedToCheckOut({cart: [], currency: 'dollar'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('creates error POST_ORDER_FAIL ', () => {
        fetchMock.postOnce('http://localhost:8000/api/orders', {
            body: { data: [], currency: 'dollar' },

            throws: new Error('Some No Good Error')
        });
        const expectedActions = [
            { type: C.POST_ORDER },
            { type: C.ADD_ERROR, payload: 'Some No Good Error' },
            { type: C.POST_ORDER_FAIL },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(proceedToCheckOut({})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates LOGIN_SUCCESS ', () => {
        fetchMock.postOnce('http://localhost:8000/api/login', {
            body: { data: {access_token: 'dsf'}, success: true },
            headers: { 'Content-Type': 'application/json' }
        }, {
            query: {
                email: 'rahul',
                password: '123'
            }
        });


        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: { data: {items : ['do something']} },
            headers: { 'Content-Type': 'application/json' }
        });
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: {data: { items: ['do something']   }},
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.LOGIN_REQUEST },
            { type: C.FETCH_PRODUCTS },
            // { type: C.CHANGE_PRODUCTS, payload: ['do something'] },
            { type: C.FETCH_ORDER_HISTORY },
            // { type: C.CHANGE_ORDER_HISTORY, payload: ['do something'] },

            { type: C.LOGIN_SUCCESS },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(login({email: 'rahul', password: '123'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });



    it('creates LOGIN_FAILURE ', () => {
        fetchMock.postOnce('http://localhost:8000/api/login', {
            body: { data: {access_token: 'dsf'}, success: false },
            headers: { 'Content-Type': 'application/json' }
        }, {
            query: {
                email: 'rahul',
                password: '123'
            }
        });


        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: { data: {items : ['do something']} },
            headers: { 'Content-Type': 'application/json' }
        });
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: {data: { items: ['do something']   }},
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.LOGIN_REQUEST },
            // { type: C.FETCH_PRODUCTS },
            // { type: C.CHANGE_PRODUCTS, payload: ['do something'] },
            // { type: C.FETCH_ORDER_HISTORY },
            // { type: C.CHANGE_ORDER_HISTORY, payload: ['do something'] },

            { type: C.LOGIN_FAILURE },
            { type: C.ADD_ERROR, payload: 'Wrong Credentials' },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(login({email: 'rahul', password: '123'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('creates REGISTER_SUCCESS ', () => {
        fetchMock.postOnce('http://localhost:8000/api/register', {
            body: { data: {access_token: 'dsf'}, success: true },
            headers: { 'Content-Type': 'application/json' }
        });


        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: { data: {items : ['do something']} },
            headers: { 'Content-Type': 'application/json' }
        });
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: {data: { items: ['do something']   }},
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.REGISTER_REQUEST },
            // { type: C.FETCH_PRODUCTS },
            // { type: C.CHANGE_PRODUCTS, payload: ['do something'] },
            // { type: C.FETCH_ORDER_HISTORY },
            // { type: C.CHANGE_ORDER_HISTORY, payload: ['do something'] },


            { type: C.REGISTER_SUCCESS },
            { type: C.LOGIN_SUCCESS },


        ];
        const store = mockStore({ products: [] });
        return store.dispatch(register({email: 'rahul', password: '123', name: 'rahul'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('creates REGISTER_FAILURE ', () => {
        fetchMock.postOnce('http://localhost:8000/api/register', {
            body: { data: {errors: {a: 'Wrong Data'}}, success: false },
            headers: { 'Content-Type': 'application/json' }
        });


        fetchMock.getOnce('http://localhost:8000/api/orders', {
            body: { data: {items : ['do something']} },
            headers: { 'Content-Type': 'application/json' }
        });
        fetchMock.getOnce('http://localhost:8000/api/products', {
            body: {data: { items: ['do something']   }},
            headers: { 'Content-Type': 'application/json' }
        });
        const expectedActions = [
            { type: C.REGISTER_REQUEST },
            // { type: C.FETCH_PRODUCTS },
            // { type: C.CHANGE_PRODUCTS, payload: ['do something'] },
            // { type: C.FETCH_ORDER_HISTORY },
            // { type: C.CHANGE_ORDER_HISTORY, payload: ['do something'] },

            { type: C.REGISTER_FAILURE },
            { type: C.ADD_ERROR, payload: 'Wrong Data' },

        ];
        const store = mockStore({ products: [] });
        return store.dispatch(register({email: 'rahul', password: '123', name: 'fd'})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

});