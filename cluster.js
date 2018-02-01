let bs = require('js-base64');
let name = 'asd';
let str = '#!/bin/bash\necho ECS_CLUSTER=' + name + ' >> /etc/ecs/ecs.config'
console.log(str);

let x = bs.Base64.encode(str);

console.log(x);