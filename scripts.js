window.imgArray = []

window.save = function save() {
    for (var j = 0; j < window.imgArray.length; j++) {
        window.imgArray[j]['properties']['url'] = window.imgArray[j]['properties']['url'].replace('/supertiles/supertiles_draw/', '/supertiles/')
    }
    var geo = {
        type: "FeatureCollection",
        features: window.imgArray
    }
    var blob = new Blob([JSON.stringify(geo)], {
        type: "application/json;charset=utf-8"
    });
    saveAs(blob, 'output.json');
}

window.fileUpload = function fileUpload() {
    var file = document.querySelectorAll('.file')[0].files[0]
    var reader = new FileReader()
    reader.onload = () => {
        window.imgArray = JSON.parse(reader.result).features
        for (var j = 0; j < window.imgArray.length; j++) {
            if (window.imgArray[j]['properties']['url'].indexOf('supertiles_draw') < 0) {
                window.imgArray[j]['properties']['url'] = window.imgArray[j]['properties']['url'].replace('/supertiles/', '/supertiles/supertiles_draw/')
            }
        }
        updateImage()
        displayGridImages()
    }
    reader.readAsText(file)
}

var index = 0
var preLoadImages = 20
window.switcher = function switcher(e) {
    index = parseInt(document.querySelectorAll('.indexSwitcher')[0].value)
    updateImage()
}

function updateImage() {
    console.log(index);
    var f = window.imgArray[index]
    document.querySelectorAll('img')[0].src = f.properties.url
    document.querySelectorAll('.index')[0].innerHTML = index
    document.querySelectorAll('.scene')[0].innerHTML = f.id
    document.querySelectorAll('.status')[0].innerHTML = f.properties.status
    document.querySelectorAll('.school_position')[0].innerHTML = f.properties.school_position
    document.querySelectorAll('.indexSwitcher')[0].value = index

    switch (f.properties.status) {
        case 'yes':
            document.querySelectorAll('.status')[0].style.color = 'green'
            break
        case 'no':
            document.querySelectorAll('.status')[0].style.color = 'red'
            break
        case 'unrecognized':
            document.querySelectorAll('.status')[0].style.color = 'yellow'
            break
        default:
            document.querySelectorAll('.status')[0].style.color = 'black'
    }
    draw(f.properties.school_position)
    if (index > 0 && index % preLoadImages == 0) {
        displayGridImages()
    }
}

function register_event(e, school_position) {
    if (e.key === 'ArrowRight') {
        index++
        updateImage()
    } else if (e.key === 'ArrowLeft') {
        index--
        updateImage()
    } else if (e.key === 'y') {
        window.imgArray[index].properties.status = 'yes'
        // Let's capture only when user make click in the image as "yes"
        if (school_position) {
            window.imgArray[index].properties.school_position = school_position
            index++
            updateImage()
        }
    } else if (e.key === 'n') {
        window.imgArray[index].properties.status = 'no'
        window.imgArray[index].properties.school_position = null
        index++
        updateImage()
    } else if (e.key === 'u') {
        window.imgArray[index].properties.status = 'unrecognized'
        window.imgArray[index].properties.school_position = null
        index++
        updateImage()
    }
}

coords_temp = []
function mousePos(event) {
    x = event.clientX
    y = event.clientY
    e = document.createEvent('Event')
    e.key = 'y'
    console.log(event.shiftKey)
    if (x >= 0 && x <= 512 && y >= 0 && y <= 512) {
        school_position = [x, y]
        if (event.shiftKey) {
            coords_temp.push(school_position)
        } else {
            if (coords_temp.length > 0) {
                register_event(e, coords_temp)
            } else {
                register_event(e, [school_position])
            }
            coords_temp = []
        }
    }
}

function draw(school_position) {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    context.beginPath()
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (school_position) {
        for (let j = 0; j < school_position.length; j++) {
            var school_p = school_position[j]
            var centerX = school_p[0]
            var centerY = school_p[1]
            var radius = 20
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
            context.lineWidth = 5
            context.strokeStyle = 'yellow'
            context.stroke()
            context.closePath()
        }
    }
}

function displayGridImages() {
    images = window.imgArray
    var gridImagesDiv = document.getElementById("grid_images");
    for (var i = 0; i < images.length; i++) {
        var element = images[i]
        if (i >= index && i < index + preLoadImages) {
            var img = new Image()
            img.src = element.properties.url
            img.className = 'grid_item'
            img.id = 'img' + i
            gridImagesDiv.appendChild(img)
        } else {
            var imgToRemove = document.getElementById('img' + i)
            if (typeof (imgToRemove) != 'undefined' && imgToRemove != null) {
                gridImagesDiv.removeChild(imgToRemove)
            }
        }
    }
}

window.addEventListener('keydown', (e) => {
    register_event(e, null)
})

window.addEventListener("click", mousePos)