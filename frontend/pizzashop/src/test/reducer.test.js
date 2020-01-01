
import C from '../constant';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import {currency, errors, fetching, orderHistory, products, addToCart, cart, isAuthenticated} from "../store/reducers";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



describe('reducers', () => {


    it('add to cart a new product ', () => {

        expect(addToCart(undefined, {type: C.ADD_TO_CART, payload: {name: 'a', price: 1}})).toEqual({name: 'a', price: 1, quantity: 1})
    });


    it('add to cart default', () => {

        expect(addToCart({}, {type: ''})).toEqual({})
    });

    it('errors initial state', () => {

        expect(errors(undefined, {type: ''})).toEqual([])
    });

    it('errors add', () => {

        expect(errors(['test'], {type: C.ADD_ERROR, payload: 'test1'})).toEqual(['test', 'test1'])
    });

    it('errors remove', () => {

        expect(errors(['test'], {type: C.CLEAR_ERROR, payload: 0})).toEqual([])
    });

    it('fetching default', () => {

        expect(fetching(undefined, {type: ''})).toEqual(false)
    });

    it('fetching true', () => {

        expect(fetching(undefined, {type: C.FETCH_PRODUCTS})).toEqual(true)
    });

    it('fetching false', () => {

        expect(fetching(undefined, {type: C.CANCEL_FETCHING})).toEqual(false)
    });


    it('currency default', () => {

        expect(currency(undefined, {type: ''})).toEqual('dollar')
    });



    it('currency dollar', () => {

        expect(currency('dollar', {type: C.CHANGE_CURRENCY, payload: 'dollar'})).toEqual('dollar')
    });

    it('currency euro', () => {

        expect(currency('dollar', {type: C.CHANGE_CURRENCY, payload: 'euro'})).toEqual('euro')
    });


    it('isAuthenticated default', () => {

        expect(isAuthenticated(undefined, {type: ''})).toEqual(false)
    });

    it('isAuthenticated true', () => {

        expect(isAuthenticated(undefined, {type: C.LOGIN_SUCCESS})).toEqual(true)
    });

    it('isAuthenticated false', () => {

        expect(isAuthenticated(undefined, {type: C.LOGIN_FAILURE})).toEqual(false)
        expect(isAuthenticated(undefined, {type: C.LOGOUT})).toEqual(false)
    });





    it('products default', () => {

        expect(products(undefined, {type: ''})).toEqual([])
    });



    it('products Clear Products', () => {

        expect(products(['test'], {type: C.CLEAR_PRODUCTS})).toEqual([])
    });

    it('products  change ', () => {

        expect(products(['test'], {type: C.CHANGE_PRODUCTS, payload: ['test1']})).toEqual(['test1'])
    });


    it('orderHistory default', () => {

        expect(orderHistory(undefined, {type: ''})).toEqual([])
    });

    it('ordersHistory Clear ', () => {

        expect(orderHistory(['test'], {type: C.CLEAR_ORDER_HISTORY})).toEqual([])
    });

    it('ordersHistory change  ', () => {

        expect(orderHistory(['test'], {type: C.CHANGE_ORDER_HISTORY, payload: ['test1']})).toEqual(['test1'])
    });

    it('ordersHistory change  ', () => {

        expect(orderHistory(['test'], {type: C.ADD_ORDER_HISTORY, payload: 'test1'})).toEqual(['test', 'test1'])
    });


    it('cart default', () => {

        expect(cart(undefined, {type: ''})).toEqual([])
    });

    it('cart add  ', () => {

        expect(cart(undefined, {type: C.ADD_TO_CART, payload: {id: 1,name: 'test', price: 1}})).toEqual([{id: 1,name: 'test', price: 1, quantity: 1}])
    });

    it('cart remove  ', () => {

        expect(cart([{id: 1,name: 'test', price: 1, quantity: 1}], {type: C.REMOVE_FROM_CART, payload: {id: 1}})).toEqual([])
    });


    it('cart decrease quantity  ', () => {

        expect(cart([{id: 1,name: 'test', price: 1, quantity: 2}], {type: C.DECREASE_QUANTITY_OF_PRODUCT_FROM_CART, payload: {id: 1,name: 'test', price: 1, quantity: 2}})).toEqual([{id: 1,name: 'test', price: 1, quantity: 1}])
    });

    it('cart increase quantity  ', () => {

        expect(cart([{id: 1,name: 'test', price: 1, quantity: 2}], {type: C.INCREASE_QUANTITY_OF_PRODUCT_FROM_CART, payload: {id: 1,name: 'test', price: 1, quantity: 2}})).toEqual([{id: 1,name: 'test', price: 1, quantity: 3}])
    });

    it('cart empty after order success  ', () => {

        expect(cart([{id: 1,name: 'test', price: 1, quantity: 2}], {type: C.EMPTY_CART_AFTER_ORDER_SUCCESS, payload: {id: 1,name: 'test', price: 1, quantity: 2}})).toEqual([])
    });



});