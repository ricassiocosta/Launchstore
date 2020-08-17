const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100)
  },
  cpfCnpj(value) {
    value = value.replace(/\D/g, "")

    if(value.length > 14) {
      value = value.slice(0, -1)
    }

    if(isCpf(value)) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1-$2")
    } else {
      value = value.replace(/(\d{2})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1/$2")
      value = value.replace(/(\d{4})(\d)/, "$1-$2")
    }

    function isCpf(value) {
      if(value.length <= 11) {
        return true
      } else {
        return false
      }
    }

    return value
  },

  cep(value) {
    value = value.replace(/\D/g, "")

    if(value.length > 8) {
      value = value.slice(0, -1)
    }

    value = value.replace(/(\d{5})(\d)/, "$1-$2")
    return value
  }
}

// Delete confirmation
const formDelete = document.querySelector('#form-delete')
if(formDelete) {
  formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar?")
    if(!confirmation) {
    event.preventDefault()
    }
  })
}

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 6,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target
    PhotosUpload.input = event.target
    
    if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const container = PhotosUpload.getContainer(image)
        PhotosUpload.preview.appendChild(container)
      }
      reader.readAsDataURL(file)
    })

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  },

  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload
    const { files: fileList } = input

    if(fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    const photosContainer = []
    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == 'photo') {
        photosContainer.push(item)
      }
    })

    const totalPhotos = fileList.length + photosContainer.length
    if(totalPhotos > uploadLimit) {
      alert('Você excedeu o limite máximo de fotos!')
      event.preventDefault()
      return true
    }

    return false
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  },

  getContainer(image) {
    const container = document.createElement('div')
    container.classList.add('photo')
    container.onclick = PhotosUpload.removePhoto
    container.appendChild(image)
    container.appendChild(PhotosUpload.getRemoveButton())

    return container
  },

  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = 'close'
    return button
  },

  removePhoto(event) {
    const photoContainer = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photoContainer)
    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoContainer.remove()
  },

  removeOldPhoto(event) {
    const photoContainer = event.target.parentNode

    if(photoContainer.id) {
      const removedFiles = document.querySelector('input[name="removed_files"')
      if(removedFiles){
        removedFiles.value += `${photoContainer.id},`
      }
    }

    photoContainer.remove()
  }
}

const ImageGallery = {
  highlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(event) {
    const { target } = event

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
    target.classList.add('active')

    ImageGallery.highlight.src = target.src
    Lightbox.image.src = target.src
  }
}

const Lightbox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open() {
    Lightbox.target.style.opacity = 1
    Lightbox.target.style.top = 0
    Lightbox.target.style.bottom = 0
    Lightbox.closeButton.style.top = 0
  },
  close(){
    Lightbox.target.style.opacity = 0
    Lightbox.target.style.top = "-100%"
    Lightbox.target.style.bottom = "initial"
    Lightbox.closeButton.style.top = "-80px"

  }
}