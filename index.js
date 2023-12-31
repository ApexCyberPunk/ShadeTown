import { sunglassesOptions } from "./glassesOptions.js"
import { sunglasses} from "./sunglasses.js"





// productDetailsElEMENT is never used... SO its commented out
// const productDetailsEl = document.getElementById("productDetails")
const productImage = document.getElementById("productImage")
const productFrames = document.getElementsByClassName("product-image_frame")[0]
const productLenses = document.getElementsByClassName("product-image_lenses")[0]
const pdH1 = document.querySelector('.pdHalf')
const pdLenses = document.querySelector('.pdLenses')
const pdFrames = document.querySelector('.pdFrames')
const pdPrice = document.querySelector('.pdPrice')

let sunglassesNew = ''

function setSunglasses(sunglassesNew = sunglasses) {
    return sunglassesNew
}

function render(sunglassesNew = sunglasses) {

    sunglassesNew = {
        model: {
            name: sunglassesNew.model.name,
            mPrice: sunglassesNew.model.price,
            thumbImg: sunglassesNew.model.thumbImg,
            cssClass: sunglassesNew.model.cssClass,
        },
        lenses: {
            lColor: sunglassesNew.lenses.color,
            lPrice: sunglassesNew.lenses.price,
            cssClass: sunglassesNew.lenses.cssClass,
        },
        frame: {
            fColor: sunglassesNew.frame.color,
            fPrice: sunglassesNew.frame.price,
            cssClass: sunglassesNew.frame.cssClass,
        }     
    }
let {frame: {fColor}, model: {mPrice}, lenses: {lPrice}, frame: {fPrice}, model: {name}, lenses: {lColor}} = sunglassesNew

    let price = "$" + (mPrice + lPrice + fPrice)


    pdH1.textContent = `
    ${name}
    `
    pdLenses.textContent = `
    ${lColor} colored lenses
    `
    pdFrames.textContent = `
    ${fColor} colored Frames
    `
    pdPrice.textContent = price


    const currClass = productImage.classList[1]
    productImage.classList.replace(currClass, sunglassesNew.model.cssClass)

    const currFramesClass = productFrames.classList[1]
    productFrames.classList.replace(currFramesClass, sunglassesNew.frame.cssClass)

    const currLensesClass = productLenses.classList[1]
    productLenses.classList.replace(currLensesClass, sunglassesNew.lenses.cssClass)

}

//Highlight current selection
function addHighlight(clickedItem) {
    if (clickedItem.classList.contains("product-thumb")) {
        Array.from(document.getElementsByClassName("product-thumb"))
            .forEach(function(thumb) {
               thumb.classList.remove("selected")
            })
    } else if (clickedItem.classList.contains("product-color-swatch")) {
        let siblings = clickedItem.closest("ul").querySelectorAll("button")
        Array.from(siblings)
            .forEach(function(swatch) {
               swatch.classList.remove("selected")
            })
    }
    clickedItem.classList.add("selected")
}


document.body.addEventListener("click", function(event) {
    let clickedItem = event.target
    //if sunglassesNew defined take variable from updates
        //else use original sunglasses object
    if (!sunglassesNew) {
        sunglassesNew = sunglasses
    }

    // update model
    if (clickedItem.classList.contains("product-thumb")) {

        let currName = clickedItem.dataset.name

        let modelOptions = sunglassesOptions.models
        .filter(function(item) {
            return item.name === currName
        })[0]

        let name = modelOptions.name
        let price = modelOptions.price
        let thumbImg = modelOptions.thumbImg
        let cssClass = modelOptions.cssClass

        sunglassesNew = {
            model: {
                name: name,
                price: price,
                thumbImg: sunglassesNew.model.thumbImg,
                cssClass: cssClass,
            },
            lenses: {
                color: sunglassesNew.lenses.color,
                price: sunglassesNew.lenses.price,
                cssClass: sunglassesNew.lenses.cssClass,
            },
            frame: {
                color: sunglassesNew.frame.color,
                price: sunglassesNew.frame.price,
                cssClass: sunglassesNew.frame.cssClass,
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }

    // update colors for frames / lenses
    if (clickedItem.classList.contains("product-color-swatch")) {
        let currColor = clickedItem.dataset.color

        // check nearest parent div
            //lenses
        if (clickedItem.closest("div").classList[0] === "product-lenses") {
            let colorOptions = sunglassesOptions.lenses
            .filter(function(item) {
                return item.color === currColor
            })[0]

            let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass

            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                },
                frame: {
                    color: sunglassesNew.frame.color,
                    price: sunglassesNew.frame.price,
                    cssClass: sunglassesNew.frame.cssClass,
                }
            }
        }

        //frames
        else {
            let colorOptions = sunglassesOptions.frames
            .filter(function(item) {
                return item.color === currColor
            })[0]

            let color = colorOptions.color
            let price = colorOptions.price
            let cssClass = colorOptions.cssClass

            sunglassesNew = {
                model: {
                    name: sunglassesNew.model.name,
                    price: sunglassesNew.model.price,
                    thumbImg: sunglassesNew.model.price,
                    cssClass: sunglassesNew.model.cssClass,
                },
                lenses: {
                    color: sunglassesNew.lenses.color,
                    price: sunglassesNew.lenses.price,
                    cssClass: sunglassesNew.lenses.cssClass,
                },
                frame: {
                    color: color,
                    price: price,
                    cssClass: cssClass,
                }     
            }
        }

        addHighlight(clickedItem)
        setSunglasses(sunglassesNew)
        render(sunglassesNew)
    }
})

render(sunglasses)