import test from 'node:test';import assert from 'node:assert/strict';import {splitAmount,balances,simplifyDebts} from './domain.js';
test('equal split preserves every paise',()=>assert.deepEqual(splitAmount(100,['a','b','c']),{a:34,b:33,c:33}));
test('weighted split preserves total',()=>{for(let amount=1;amount<2000;amount++){const s=splitAmount(amount,['a','b','c'],'shares',{a:1,b:2,c:3});assert.equal(Object.values(s).reduce((a,b)=>a+b),amount);}});
test('invalid splits rejected',()=>{assert.throws(()=>splitAmount(100,['a','b'],'percent',{a:50,b:40}));assert.throws(()=>splitAmount(100,['a','b'],'exact',{a:1,b:1}));assert.throws(()=>splitAmount(-1,['a']));assert.throws(()=>splitAmount(100,[]));});
test('settlements reduce debts and keep balances zero-sum',()=>{const e=[{paidBy:'a',amount:300,splits:{a:100,b:100,c:100},currency:'INR'}];const b=balances(e,[{from:'b',to:'a',amount:100,currency:'INR'}]);assert.deepEqual(b,{a:100,b:0,c:-100});assert.deepEqual(simplifyDebts(b),[{from:'c',to:'a',amount:100}]);});
test('currencies are never mixed',()=>assert.deepEqual(balances([{currency:'USD',paidBy:'a',amount:100,splits:{b:100}}],[],'INR'),{}));
