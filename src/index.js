import {getDescriptionTag} from './common/util';

const description = getDescriptionTag();
document.querySelector('#app').innerHTML = description;