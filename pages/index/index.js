// const app = getApp()
import numeral from 'numeral'

Page({
    data: {
        toggle: {
            post: false
        },
        goods: Array(8).fill().map((n, i) => ({
            name: `商品 ${i + 1}`,
            id: i,
            img: `/img/goods/${i + 1}.jpg`,
            price: numeral(Math.random() * 100).format('0,0.00'),
            desc: '这是一段很长的商品描述信息~这是一段很长的商品描述信息~这是一段很长的商品描述信息~这是一段很长的商品描述信息~'
        })),
        postItem: null
    },

    onLoad () {

    },

    showPost (e) {
        const { item } = e.currentTarget.dataset

        this.setData({
            'toggle.post': true,
            postItem: item
        })
    },

    closePost () {
        this.setData({
            'toggle.post': false
        })
    }
})
