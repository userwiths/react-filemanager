import FileIcon from '@material-ui/icons/InsertDriveFile';
import CodeIcon from '@material-ui/icons/Code';
import DescriptionIcon from '@material-ui/icons/Description';
import MovieIcon from '@material-ui/icons/Movie';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PhotoIcon from '@material-ui/icons/Photo';

import config from './config';
import React from 'react';

export function GetIconByType(props){
    let type;
    let name=props.name.split('.');
    name=name.pop();
    for(let i=0;i<config.type_by_extension.length;i+=1){
        if(config.type_by_extension[i].extensions.includes(name)){
            type=config.type_by_extension[i].name;
        }
    }
    switch(type){
        case 'video':return (<MovieIcon/>);
        case 'image':return (<PhotoIcon/>);
        case 'music':return (<MusicVideoIcon/>);
        case 'document':return (<DescriptionIcon/>);
        case 'code':return (<CodeIcon/>);
        default:return (<FileIcon/>);
    }
}

export function GetMediaByType(data){
    let name=data.split('.');
    name=name.pop();
    for(let i=0;i<config.type_by_extension.length;i+=1){
        if(config.type_by_extension[i].extensions.includes(name)){
            return config.type_by_extension[i].name;
        }
    }
}