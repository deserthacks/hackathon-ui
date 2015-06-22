'use strict';

var h = require('react-hyperscript');
var React = require('react');

var Footer = React.createClass({

  render: function() {
    return (
      h('div', {className: 'container'}, [
        h('footer', {className: 'col-md-12'}, [
          h('ul', {className: 'list-inline text-center'}, [
            h('li', [
              h('a', {href: 'http://deserthacks.org'}, 'Created by DesertHacks'),
              h('span', '@ HackArizona S15')
            ]),
            h('li', [
              h('a', {href: 'https://github.com/deserthacks/hackathon-ui'}, 'Fork us')
            ])
          ])
        ])
      ])
    );
  }

});

module.exports = Footer;
