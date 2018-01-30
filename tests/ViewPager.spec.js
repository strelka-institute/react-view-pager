import React from 'react'
import reactDom from 'react-dom/server'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import assert from 'assert'

import { ViewPager, Frame, Track, View }  from '../src/react-view-pager'

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

describe('ViewPager', () => {

  let pages = [1, 2, 3].map(page => <div>{page}</div>)

  it('can render on the server side', () => {
    let shallowRenderedComponent = shallow(
      <ViewPager>
        <Frame>
          <Track>
            {pages.map((page, index) => <View key={index}>{page}</View>)}
          </Track>
        </Frame>
      </ViewPager>
    )
    assert(shallowRenderedComponent.length, 1);
  })

})
