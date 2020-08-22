import Vue from 'vue'
import Post from '../../../src/theme/Post.vue'
import { expect } from 'chai'

describe('Post.vue', () => {
  const createComponent = () => {
    const PostConstructor = Vue.extend(Post)
    const comp = new PostConstructor({
      propsData: {
        link: 'http://www.pluralsight.com'
      }
    }).$mount()
    return comp
  }
  it('should render the link', () => {
    const comp = createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('http://www.pluralsight.com')
  })
  it('should update element\'s href when property link changes', (done) => {
    const comp = createComponent()
    expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
      .to.equal('http://www.pluralsight.com')

    comp.link = 'http://www.manycrowns.co.uk'
    Vue.nextTick(() => {
      expect(comp.$el.querySelector('.card-footer-item').getAttribute('href'))
        .to.equal('http://www.manycrowns.co.uk')
      done()
    })
  })
})
