/**
 * User: caolvchong@gmail.com
 * Date: 9/11/13
 * Time: 10:03 PM
 */
define(function(require, exports, module) {
    var $ = require('$');
    var Base = require('../base');
    var Dnd = require('./dnd');
    var undef;

    var Sortable = Base.extend({
        attrs: {
            element: { // 当前被排序的容器
                getter: function(val) {
                    if(typeof val === 'string') {
                        return $(val);
                    }
                    return val ? val : null;
                }
            },
            item: '', // 容器内被排序的列表元素
            handler: null,
            connect: null, // 可拖拽到的容器
            placeholder: null,
            connectSelf: true,
            revert: false
        },
        initialize: function(config) {
            var that = this;
            Sortable.superclass.initialize.apply(this, arguments);

            var placeholder;
            var lastContainer; // 最后存放的容器
            var dragElement = typeof this.get('item') === 'string' ? this.get('element').find(this.get('item')) : this.get('item');

            this.dnd = new Dnd({
                element: dragElement,
                handler: this.get('handler'),
                drop: (function() {
                    var arr = [];
                    var connect = this.get('connect');
                    if(connect) {
                        $(connect).each(function(i, el) {
                            arr.push($(el));
                        });
                    }
                    if(this.get('connectSelf') !== false) {
                        arr.push(this.get('element'));
                    }
                    return arr;
                }).call(this),
                position: dragElement.eq(0).css('position') || 'static'
            }).on('beforedrag',function(dnd) {
                    return that.trigger('beforedrag', dnd);
                }).on('dragstart',function(dataTransfer, dragging, dropping, dnd) {
                    lastContainer = null;
                    placeholder = that.get('placeholder') || this.element.clone().empty().css({
                        visibility: 'visible',
                        border: '1px dashed #ddd',
                        background: '#fff'
                    }).data('placeholder', true);
                    this.element.hide().after(placeholder); // todo: 插入位置计算
                    that.trigger('dragstart', dataTransfer, dragging, dropping, dnd);
                }).on('drag',function(dragging, dropping, dnd) {
                    var proxy = this.get('proxy');
                    var element = this.element;
                    if(dropping) { // 划过可接纳的容器
                        lastContainer = dropping;
                        var items = dropping.find(that.get('item'));
                        items = items.filter(function(i) {
                            var item = items.eq(i);
                            return !(item.data('proxy') || item.data('placeholder'));
                        });
                        var len = items.length;
                        if(len === 0) { // 容器内无元素
                            dropping.append(placeholder);
                        } else { // 容器内有元素
                            var result = getCurrentItem(proxy, items);
                            result.item[result.position](element);
                            element.after(placeholder);
                        }
                    }
                    that.trigger('drag', dragging, dropping, dnd);
                }).on('dragenter',function(dragging, dropping, dnd) {
                    that.trigger('dragenter', dragging, dropping, dnd);
                }).on('dragover',function(dragging, dropping, dnd) {
                    that.trigger('dragover', dragging, dropping, dnd);
                }).on('dragleave',function(dragging, dropping, dnd) {
                    that.trigger('dragleave', dragging, dropping, dnd);
                }).on('dragend',function(element, dropping, dnd) {
                    var node = this.element.css('position', this.element.data('style').position || '').show();
                    placeholder.replaceWith(node);
                    if(lastContainer && lastContainer[0] !== that.get('element')[0]) { // 存在dropping表明是拖放到可以存放的容器，若不是原来容器，则需要重新注册拖拽
                        that.dnd.destroy(that.get('handler') ? node.find(that.get('handler')) : node); // 将原来拖拽销毁
                        if(lastContainer.data('dnd')) { // 新容器存在拖放，则注册
                            lastContainer.data('dnd').render(node);
                        }
                        lastContainer = null;
                    }
                    that.trigger('dragend', element, dropping, dnd);
                }).on('drop', function(dataTransfer, element, dropping, dnd) {
                    that.trigger('drop', dataTransfer, element, dropping, dnd);
                });
            this.get('element').data('dnd', this.dnd); // 在容器缓存拖拽，以便给添加进来的对象注册
        }
    });

    /**
     * 获取对应排序的元素及其插入的位置
     * @param node 拖拽的代理元素
     * @param list 容器内的列表元素
     * @returns {{item: *, position: string}}
     */
    function getCurrentItem(node, list) {
        var o = node.offset();
        var o2;
        var x = o.left + node.outerWidth() / 2;
        var y = o.top + node.outerHeight() / 2;
        var n;
        var item; // 命中的节点
        var rule = 'top'; // 判断是由top判断插入位置还是left
        var top;
        list.each(function(i, v) {
            v = $(v);
            var vo = v.offset();
            var vx = vo.left + v.outerWidth() / 2;
            var vy = vo.top + v.outerHeight() / 2;
            if(top === undef) {
                top = vo.top;
            } else if(top === vo.top) {
                rule = 'left';
            }
            var d = Math.pow(vx - x, 2) + Math.pow(vy - y, 2);
            if(!n || d < n) {
                n = d;
                item = v;
                o2 = vo;
            }
        });

        return {
            item: item,
            position : o[rule] < o2[rule] ? 'before' : 'after'
        };
    }

    module.exports = Sortable;
});