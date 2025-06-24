import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameStats from '@/components/GameStats.vue'

describe('GameStats', () => {
  it('should render correctly with props', () => {
    const wrapper = mount(GameStats, {
      props: {
        moves: 10,
        time: 65000, // 1:05
        matchedPairs: 3,
        totalPairs: 6,
      },
    })

    expect(wrapper.find('.game-stats__value').text()).toContain('10')
    expect(wrapper.text()).toContain('01:05')
    expect(wrapper.text()).toContain('3 / 6')
  })

  it('should format time correctly', () => {
    const wrapper = mount(GameStats, {
      props: {
        moves: 0,
        time: 125000, // 2:05
        matchedPairs: 0,
        totalPairs: 8,
      },
    })

    expect(wrapper.text()).toContain('02:05')
  })

  it('should display zero values correctly', () => {
    const wrapper = mount(GameStats, {
      props: {
        moves: 0,
        time: 0,
        matchedPairs: 0,
        totalPairs: 6,
      },
    })

    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('00:00')
    expect(wrapper.text()).toContain('0 / 6')
  })
})
