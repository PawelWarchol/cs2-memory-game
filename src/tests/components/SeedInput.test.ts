import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SeedInput from '@/components/SeedInput.vue'

describe('SeedInput', () => {
  it('should render with initial value', () => {
    const wrapper = mount(SeedInput, {
      props: {
        modelValue: 'test-seed',
      },
    })

    const input = wrapper.find('.seed-input__field')
    expect((input.element as HTMLInputElement).value).toBe('test-seed')
  })

  it('should emit update on input', async () => {
    const wrapper = mount(SeedInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('.seed-input__field')
    await input.setValue('new-seed')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new-seed'])
  })

  it('should generate random seed when button is clicked', async () => {
    // Mock Math.random to return predictable value
    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.123456789)

    const wrapper = mount(SeedInput, {
      props: {
        modelValue: '',
      },
    })

    const generateButton = wrapper.find('.seed-input__generate')
    await generateButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    const emittedValue = wrapper.emitted('update:modelValue')?.[0]?.[0]
    expect(typeof emittedValue).toBe('string')
    expect(emittedValue.length).toBeGreaterThan(0)

    mockRandom.mockRestore()
  })

  it('should show help text', () => {
    const wrapper = mount(SeedInput, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.text()).toContain(
      'Użyj tego samego seed-a aby odtworzyć identyczny układ kafelków'
    )
  })

  it('should have correct placeholder', () => {
    const wrapper = mount(SeedInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('.seed-input__field')
    expect(input.attributes('placeholder')).toBe('Zostaw puste dla losowego')
  })
})
