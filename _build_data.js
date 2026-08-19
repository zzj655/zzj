// 一次性构建脚本：把 GLB 模型编码为 base64 嵌入 JS 文件
const fs = require('fs');
const path = require('path');

const root = 'd:/codex版的第二弹网站/个人网站第二弹';
const glbPath = path.join(root, '未知3d第一', '街头摄影3d模型.glb');
const outPath  = path.join(root, 'character.data.js');

console.log('Reading GLB:', glbPath);
const buf = fs.readFileSync(glbPath);
console.log('GLB size:', (buf.length / 1024 / 1024).toFixed(2), 'MB');

const b64 = buf.toString('base64');
console.log('Base64 length:', b64.length);

const content =
  '/* AUTO-GENERATED. GLB 模型 base64 内嵌，规避 file:// 协议的 CORS 限制。\n' +
  '   重新生成方式：在 Node 中运行 node _build_data.js\n' +
  '   删除/忽略此文件后，页面会回到 fetch 加载路径（需通过 http 服务器访问）。 */\n' +
  'window.CHARACTER_DATA_URI = "data:model/gltf-binary;base64,' + b64 + '";\n';

fs.writeFileSync(outPath, content);
console.log('Written:', outPath);
console.log('JS file size:', (fs.statSync(outPath).size / 1024 / 1024).toFixed(2), 'MB');
