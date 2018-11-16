import {
    word_props
} from '../../services/const.js'

const warn = (msg, getValue) => {
    console.warn(msg);
    console.log('接受到的值为：', getValue);
};

Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    relations: {
        '../cell-group/index': {
            type: 'parent'
        }
    },

    properties: {
        // 单词
        title: {
            type: String
        },
        // 笔记
        label: {
            type: String
        },
        // 词性代号
        value: {
            type: Number
        },
        // 只有点击 footer 区域才触发 tab 事件
        onlyTapFooter: {
            type: Boolean
        },
        // 是否展示右侧箭头并开启尝试以 url 跳转
        isLink: {
            type: null,
            value: ''
        },
        // 词性
        prop: {
            type: Number,
            value: 5
        },
        // 链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch
        linkType: {
            type: String,
            value: 'navigateTo'
        },
        url: {
            type: String,
            value: ''
        }
    },

    data: {
        isLastCell: true,
        propColor: '',
        propName: ''
    },

    attached: function() {
        this.setData({
            propColor: word_props[this.properties.prop].color,
            propName: word_props[this.properties.prop].prop
        })
    },

    methods: {
        navigateTo () {
            const { url } = this.data;
            const type = typeof this.data.isLink;

            this.triggerEvent('click', {});

            if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

            if (type !== 'boolean' && type !== 'string') {
                warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink);
                return;
            }

            if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
                warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType);
                return;
            }
            wx[this.data.linkType].call(wx, {url});
        },
        handleTap () {
            if (!this.data.onlyTapFooter) {
                this.navigateTo();
            }
        },

        updateIsLastCell (isLastCell) {
            this.setData({ isLastCell });
        }
    }
});