// src/reducers/counterReducer.test.js:
import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {  // Global declaration: The official initial state
    good: 0,
    ok: 0,
    bad: 0
  }
  const nonZeroState = {  // Global declaration: A known, populated state.
    good: 3,
    ok: 2,
    bad: 1
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

   test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('state is reset to initial state (all zeros)', () => {
    const state = nonZeroState // Use the global populated state
    const action = {
      type: 'RESET'
    }
  
    deepFreeze(state) // Ensure existing state is not modified
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)   // Expect the new state to match the initial state
  })

  test('state is not changed on unknown action (default case)', () => {
    const state = nonZeroState // Use the global populated state, again.
    
    const action = { type: 'UNDEFINED_ACTION_TYPE' }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toBe(state) // Expect unchanged object reference
  })
})
