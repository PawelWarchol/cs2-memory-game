import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DifficultySelector from '@/components/DifficultySelector.vue'

describe('DifficultySelector', () => {
  it('should render difficulty options', () => {
    const wrapper = mount(DifficultySelector, {
      props: {
        modelValue: 'medium',
      },
    })

    expect(wrapper.text()).toContain('Łatwy')
    expect(wrapper.text()).toContain('Średni')
    expect(wrapper.text()).toContain('Trudny')
  })

  it('should highlight selected option', () => {
    const wrapper = mount(DifficultySelector, {
      props: {
        modelValue: 'hard',
      },
    })

    const options = wrapper.findAll('.difficulty-selector__option')
    const hardOption = options.find((option) => option.text().includes('Trudny'))

    expect(hardOption?.classes()).toContain('difficulty-selector__option--active')
  })

  it('should emit update when option is clicked', async () => {
    const wrapper = mount(DifficultySelector, {
      props: {
        modelValue: 'medium',
      },
    })

    const options = wrapper.findAll('.difficulty-selector__option')
    const easyOption = options.find((option) => option.text().includes('Łatwy'))

    await easyOption?.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['easy'])
  })

  it('should display correct descriptions', () => {
    const wrapper = mount(DifficultySelector, {
      props: {
        modelValue: 'medium',
      },
    })

    expect(wrapper.text()).toContain('6 par (3×4)')
    expect(wrapper.text()).toContain('8 par (4×4)')
    expect(wrapper.text()).toContain('12 par (6×4)')
  })
})
