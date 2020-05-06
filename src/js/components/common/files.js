import React from 'react'
import Document from '../../../images/document.svg';
import { connect } from 'react-redux'
import '../../../css/style-list.css'
const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
const extRegexp = /\.[a-zA-Z0-9]*$/;

class ButtonFile extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.onDrop = this.onDrop.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
        this.openFileChooser = this.openFileChooser.bind(this)
        this.id = 1
        this.state = {
            files: []
        }
    }

    onDrop(event) {
        event.preventDefault()
        this.onDragLeave(event)
        let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files
        if (this.props.multiple === false && filesAdded.length > 1) {
            filesAdded = [filesAdded[0]]
        }

        let files = []
        for (let i = 0; i < filesAdded.length; i++) {

            let file = filesAdded[i]
            file.id = 'files-' + this.id++
            file.extension = this.fileExtension(file)
            file.sizeReadable = this.fileSizeReadable(file.size)
            if (file.type && this.mimeTypeLeft(file.type) === 'image') {
                file.preview = {
                    type: 'image',
                    url: window.URL.createObjectURL(file)
                }
            } else {
                file.preview = {
                    type: 'file'
                }
            }
            if (this.state.files.length + files.length >= this.props.maxFiles) {
                this.onError({
                    code: 4,
                    message: 'maximum file count reached'
                }, file)
                break
            }
            if (this.fileTypeAcceptable(file) && this.fileSizeAcceptable(file)) {
                files.push(file)
            }
        }


        this.setState({
            files: this.props.multiple === false
                ? files
                : [...this.state.files, ...files]
        }, () => {
            this.props.onChange.call(this, this.state.files)
        })

    }

    onDragLeave(event) {
        let el = this.dropzone
        this.dropzone.className = el.className.replace(' ' + this.props.dropActiveClassName, '')
    }

    openFileChooser() {
        this.inputElement.value = null
        this.inputElement.click()
    }

    fileTypeAcceptable(file) {
        let accepts = this.props.accepts;
        if (!accepts) {
            return true
        }
        const result = accepts.some(accept => {
            if (file.type && accept.match(mimeTypeRegexp)) {
                let typeLeft = this.mimeTypeLeft(file.type)
                let typeRight = this.mimeTypeRight(file.type)
                let acceptLeft = accept.split('/')[0]
                let acceptRight = accept.split('/')[1]
                if (acceptLeft && acceptRight) {
                    if (acceptLeft === typeLeft && acceptRight === '*') {
                        return true
                    }
                    if (acceptLeft === typeLeft && acceptRight === typeRight) {
                        return true
                    }
                }
            } else if (file.extension && accept.match(extRegexp)) {
                const ext = accept.substr(1);
                return file.extension.toLowerCase() === ext.toLowerCase();
            }
            return false
        });

        if (!result) {
            this.onError({
                code: 1,
                message: file.name + ' is not a valid file type'
            }, file)
        }
        return result
    }

    fileSizeAcceptable(file) {
        if (file.size > this.props.maxFileSize) {
            this.onError({
                code: 2,
                message: file.name + ' is too large'
            }, file)
            return false
        } else if (file.size < this.props.minFileSize) {
            this.onError({
                code: 3,
                message: file.name + ' is too small'
            }, file)
            return false
        } else {
            return true
        }
    }

    mimeTypeLeft(mime) {
        return mime.split('/')[0]
    }

    mimeTypeRight(mime) {
        return mime.split('/')[1]
    }

    fileExtension(file) {
        let extensionSplit = file.name.split('.')
        if (extensionSplit.length > 1) {
            return extensionSplit[extensionSplit.length - 1]
        } else {
            return 'none'
        }
    }

    fileSizeReadable(size) {
        if (size >= 1000000000) {
            return Math.ceil(size / 1000000000) + 'GB'
        } else if (size >= 1000000) {
            return Math.ceil(size / 1000000) + 'MB'
        } else if (size >= 1000) {
            return Math.ceil(size / 1000) + 'kB'
        } else {
            return Math.ceil(size) + 'B'
        }
    }

    onError(error, file) {
        this.props.onError.call(this, error, file)
    }

    removeFile(fileToRemove) {
        this.setState({
            files: this.state.files.filter(file => file.id !== fileToRemove.id)
        }, () => {
            this.props.onChange.call(this, this.state.files)
        })
    }

    removeFiles() {
        this.setState({
            files: []
        }, () => {
            this.props.onChange.call(this, this.state.files)
        })
    }

    render() {
        const inputAttributes = {
            type: 'file',
            accept: this.props.accepts ? this.props.accepts.join() : '',
            multiple: this.props.multiple,
            name: this.props.name,
            style: { display: 'none' },
            ref: (element) => {
                this.inputElement = element
            },
            onChange: this.onDrop
        }

        return (
            <div>
                <input
                    {...inputAttributes}
                />
                <div
                    onClick={
                        this.props.clickable === true
                            ? this.openFileChooser
                            : null
                    }
                    onDrop={this.onDrop}
                    onDragLeave={this.onDragLeave}
                    ref={dropzone => { this.dropzone = dropzone }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}


class Files extends React.Component {

    constructor(props) {
        super(props)
        this.filesRemoveOne = this.filesRemoveOne.bind(this)
    }

    onFilesChange = (files) => {
        this.props.handleOnFilesChange(files);
        console.log(files)
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    render() {
        return (

            <div>
                <h4 className="head-title-bottom mt-2">ข้อมูลแนบไฟล์</h4>
                <div className="u-clearfix">
                    <div className="u-float-left">
                        <label className="p-form__label" ><span className="top-text">ไฟล์เอกสาร</span></label>
                    </div>
                    <div className=" u-float-right">
                        <ButtonFile
                            ref='files'
                            onChange={this.onFilesChange}
                            onError={this.onFilesError}
                            multiple={this.props.multiple}
                            maxFiles={this.props.maxFiles}
                            maxFileSize={this.props.maxFileSize}
                            minFileSize={this.props.minFileSize}
                            clickable={this.props.clickable}>
                            <label><span className="top-text">แนบไฟล์ +</span></label>
                        </ButtonFile>
                    </div>
                </div>

                {
                    this.props.files.length > 0
                            ? 
                            <div className="dropZone-list" >
                            {this.props.files.map((file) =>

                                <li className="list-group-item" key={file.id}>
                                    <div className="media-body media-left">
                                        <img className="media-object" src={file.preview.url} width={150} height={100}/>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="media-heading" style={{fontWeight: 'bold'}}>{file.name}</h4>
                                        <p className="media-heading">ขนาดไฟล์ : {file.sizeReadable}</p>
                                        <p className="media-heading" style={{color: "blue"}}
                                             id={file.id}
                                             onClick={ (e) => {  if (window.confirm('คุณต้องการลบสินนี้หรือไม่'))this.filesRemoveOne(file)
                                                }
                                             }
                                        >ลบ</p>  
                                    </div>
                                </li>
                                
                            )}
                            </div>                            
                            : 
                            <div className="dropZone" >
                                <div className="grid_12">
                                    <img src={Document} alt="Generic placeholder thumbnail" height="100px" />
                                </div>
                                <div className="grid_12 top-text">ไม่พบไฟล์เอกสาร</div>
                                <div className="grid_12 top-text">คลิกที่ "+" ในการแนบเอกสาร</div>
                            </div>
                }
                
            </div>


        )
    }

}




const mapStateToProps = (state) => ({
    files: state.files,
    clickable: state.clickable,
    accepts: state.accepts,
    multiple: state.multiple,
    maxFiles: state.maxFiles,
    maxFileSize: state.maxFileSize,
    minFileSize: state.minFileSize,
})
const mapDispatchToProps = (dispatch) => ({
    handleOnFilesChange: (value) => dispatch(onFilesChange(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Files);

export const onFilesChange = (value) => {
    return {
        type: "FILES",
        value: value
    }
}

