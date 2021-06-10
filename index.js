const $ = {}
$.app = document.getElementById('app')
$.wrapper = app.querySelector('.wrapper')
$.mainText = app.querySelector('.main-text')
$.quotesAmount = app.querySelector('#quotes-amount')

const slidesInfo = [{
        src: 'https://images.unsplash.com/photo-1542204625-ca960ca44635?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        text: 'but your enemies closer',
        title: 'Keep your friends close',
    },
    {
        src: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlsbXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'an offer he can \'t refuse',
        title: 'I\'m going to make him',
    },
    {
        src: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNpbmVtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        text: 'we have a problem',
        title: 'Houston!',
    },
    {
        src: 'https://images.unsplash.com/photo-1530819568329-97653eafbbfa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGZpbG1zfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'like home',
        title: 'There\'s no place',
    },
    {
        src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'tomorrow is another day!',
        title: 'After all',
    },
    {
        src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2luZW1hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        text: 'my dear Watson!',
        title: 'Elementary',
    },
    {
        src: 'https://images.unsplash.com/photo-1590452522688-e919e18c9e96?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNpbmVtYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'You do not talk about Fight Club',
        title: 'The first rule of Fight Club is',
    }
]

// ;)
loadQoutesIntoStack()

class Slide {
    constructor({
        key: key,
        src: url,
        title: title,
        text: text,
    }) {
        this.src = url
        this.key = key
        this.elem = document.createElement('div')
        this.elem.className = 'slide__wrapper'
        this.title = title
        this.text = text
    }

    static activate(slide) {
        // Hide the main text
        slide.classList.add('_active')

        setTimeout(() => {
            slide.classList.add('_settled')
        }, 500);

        $.mainText.remove()
    }

    _generateTextQoutation() {
        return `
            <div class="text">
                <h2 class = "suptitle">${this.text}</h2> 
                <h1 class = "title">${this.title}</h1>
            </div>
        `
    }

    render() {
        const qoute = this._generateTextQoutation()
        const img = document.createElement('div')
        img.className = 'slide__img'
        img.setAttribute('style', `background-image: url(${this.src}); bottom:${this.key * 25}px;`)

        this.elem.insertAdjacentHTML('beforeend', qoute)

        this.elem.appendChild(img)

        return this.elem
    }
}

class SlidesCollection {
    constructor(slides) {
        this.slides = slides
    }

    setClickHandlers() {
        this.slides.forEach((slide) => {
            slide.querySelector('.slide__img').addEventListener('click', () => {
                this._disactivateEvery()

                Slide.activate(slide)
            })
        })
    }

    _disactivateEvery() {
        this.slides.forEach(slide => {
            let mainClasses = ['_settled', '_active']

            slide.classList.remove(...mainClasses)
        })
    }
}

const collection = new SlidesCollection(slidesInfo.map((slide, key) => {
    return new Slide({
        key: key,
        ...slide
    }).render()
}))

collection.setClickHandlers()

function loadQoutesIntoStack() {
    $.quotesAmount.innerHTML = '0'

    for (let i = 0; i < slidesInfo.length; i++) {
        setTimeout(() => {
            $.wrapper.appendChild(collection.slides[i])
            $.quotesAmount.innerHTML = ++$.quotesAmount.innerHTML
        }, (200 + i * 200));
    }
}