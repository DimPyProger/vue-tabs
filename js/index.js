let data = {
  main: [
        {id: 1, name: 'first', text: 'Tab 1'},
        {id: 2, name: 'second', text: 'Tab 2'},
        {id: 3, name: 'third', text: 'Tab 3'},
        {id: 4, name: 'fourth', text: 'Tab 4'},
      ],
  tags: [
        {id: 1, name: 'bold', html: '<b>Tab 1</b>'},
        {id: 2, name: 'italic', html: '<i>Tab 2</i>'},
        {id: 3, name: 'underlined', html: '<u>Tab 3</u>'},
        {id: 4, name: 'strike', html: '<s>Tab 4</s>'},
      ],
  error: [
        {id: 1, name: 'main', html: 'This is main tab.'},
        {id: 2, name: 'error'}
      ],
  additional: [
        {id: 1, name: 'apple', img: 'https://images.unsplash.com/photo-1507260385058-676ee3f043e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e6483a95cbd28bb2858d19efc9fcdfa5&auto=format&fit=crop&w=1350&q=80', text: 'Tab 1'},
        {id: 2, name: 'pear', img: 'https://images.unsplash.com/photo-1413754955600-83a12e8ba7de?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dcdb5d94040ba436b31bd13ac7ab2233&auto=format&fit=crop&w=1350&q=80', text: 'Tab 2'},
        {id: 3, name: 'orange', img: 'https://images.unsplash.com/photo-1459663296021-50769c04b149?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cc0677439761a17bf1dfef2bc5c8202e&auto=format&fit=crop&w=1350&q=80', text: 'Tab 3'},
        {id: 4, name: 'berries', img: 'https://images.unsplash.com/photo-1438907046657-4ae137eb8c5e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cf16e5ceb43f29df79e3a61b54ed1e2&auto=format&fit=crop&w=1350&q=80', text: 'Tab 4'}
      ]
};

Vue.filter('upperFirstLetter', function(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.component('tabs-block', {
  props: {
    name: {
      default: 'main',
      type: String
    },
    size: {
      default: '100%',
      type: String
    },
    tab: {
      default: 1,
      type: Number
    },
    navAlign: {
      default: 'left',
      type: String,
      validator: function(value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      }
    },
    blockAlign: {
      default: 'left',
      type: String
    }
  },
  data: function() {
    return {
      tabs: typeof data[this.name] != 'undefined' ? data[this.name] : data.main,
      currentTab: this.tab,
      settings: {
        size: this.size,
        nav: {
          align: this.navAlign
        },
        block: {
          align: this.blockAlign
        }
      },
      align: {
        left: {
          style: 'flex-start',
          class: false
        },
        center: {
            style: 'center',
            class: 'header_middle'
        },
        right: {
          style: 'flex-end',
          class: 'header_right'
        }
      }
    }
  },
  computed: {
    getTabWidth: function() {
      return {
        width: this.settings.size
      }
    },
    getNavAlign: function() {
      return {
        display: 'flex',
        'justify-content': this.align[this.settings.nav.align].style
      }
    },
    getClasses: function() {
      return this.align[this.settings.nav.align].class
    },
    getBlockAlign: function() {
      return {
        display: 'flex',
        'justify-content': this.align[this.settings.block.align].style
      }
    }
  },
  template: `<div class="tabs" :style="getTabWidth">
                  <header class="tabs__header"
                          :class="getClasses"
                          :style="getNavAlign">
                    <nav class="tabs__nav">
                      <ul class="tabs__menu">
                        <li class="tabs__menu-item"
                            v-for="tab in tabs"
                            v-bind:key="tab.id"
                            v-bind:class="[currentTab == tab.id ? 'tabs__menu-item_current' : '']"
                            v-on:click="currentTab = tab.id">{{ tab.name | upperFirstLetter }}</li>
                      </ul>
                    </nav>
                  </header>
                <div class="tab tabs__tab-content" :style="getBlockAlign">
                  <p v-if="tabs[currentTab-1].html"
                     v-html="tabs[currentTab-1].html"></p>
                  <div class="tabs__body" v-else-if="tabs[currentTab-1].img"
:class="settings.right"><img class="tabs__img" :src="tabs[currentTab-1].img"><p>{{ tabs[currentTab-1].text }}</p></div>
                  <p v-else-if="tabs[currentTab-1].text">{{ tabs[currentTab-1].text }}</p>
                  <p class="tab__text_undefined" v-else>The value of tab is not defined!</p>
                </div>
              </div>`
});

new Vue({
  el: '#app'
});