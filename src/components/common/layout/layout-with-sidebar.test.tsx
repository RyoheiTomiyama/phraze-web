import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LayoutWithSidebar } from './layout-with-sidebar'

describe('LayoutWithSidebar', () => {
  it('sidebar は aside 内に描画される', () => {
    const { container } = render(
      <LayoutWithSidebar sidebar={<span>Sidebar</span>}>
        Main
      </LayoutWithSidebar>,
    )
    const aside = container.querySelector('aside') as HTMLElement
    expect(aside).toHaveTextContent('Sidebar')
    expect(aside).not.toHaveTextContent('Main')
  })

  it('children は aside 外のメイン領域に描画される', () => {
    const { container } = render(
      <LayoutWithSidebar sidebar={<span>Sidebar</span>}>
        Main
      </LayoutWithSidebar>,
    )
    const divs = container.querySelectorAll('div')
    const main = divs[divs.length - 1] as HTMLElement
    expect(main).toHaveTextContent('Main')
    expect(main).not.toHaveTextContent('Sidebar')
  })

  it('sidebar 省略時は aside は空になる', () => {
    const { container } = render(<LayoutWithSidebar>Main</LayoutWithSidebar>)
    const aside = container.querySelector('aside') as HTMLElement
    expect(aside).toBeEmptyDOMElement()
  })

  it('className が外側と内側の両方の div に反映される', () => {
    const { container } = render(
      <LayoutWithSidebar className="custom-class">Main</LayoutWithSidebar>,
    )
    const divs = container.querySelectorAll('div')
    expect(divs[0]).toHaveClass('custom-class')
    expect(divs[1]).toHaveClass('custom-class')
  })
})
