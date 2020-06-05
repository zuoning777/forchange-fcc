#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander')
const ncp = require('ncp')

let source = __dirname + '/templates';
let target = './src/modules/';

program.version('0.1.10');
program
.command('module [moduleName]')
.alias('m')
.description('创建模块')
.action((modules,option) => {
  // 生成模块根目录
  try {
    fs.mkdirSync(target + modules)
  } catch (error) {
    if(error.errno === -17){
      console.log(error.path + '已存在')
    }
  }
  try {
    fs.mkdirSync(target + modules + '/assets')
  } catch (error) {
    if(error.errno === -17){
      console.log(error.path + '已存在')
    }
  }
  try {
    fs.mkdirSync(target + modules + '/components')
  } catch (error) {
    if(error.errno === -17){
      console.log(error.path + '已存在')
    }
  }
  // 复制templates中文件到模块根目录中
  ncp(source,target + modules,(err) => {
    if(err) {
      console.log(err)
      return
    }
    // 替换pages内模板中的Template为modules名
    fs.readFile(source + '/pages/Template.tsx','utf8', (err,data) => {
      if(err) {
        console.log(err)
        return
      }
      const result = data.replace(/Template/g, modules)
      writeFile(target + modules + '/pages/Template.tsx', result)
      rename(target + modules + '/pages/Template.tsx', target + modules + '/pages/' + modules + '.tsx')
      rename(target + modules + '/styles/Template.less', target + modules + '/styles/' + modules + '.less')
    })
    // 替换routes.tsx模板中的组件名为modules名
    fs.readFile(source + '/routes.tsx','utf8',(err,data) => {
      if(err) {
        console.log(err)
        return
      }
      const result = data.replace(/Template/g, modules)
      writeFile(target + modules + '/routes.tsx', result)
    })
  })
})


function writeFile(fileName, data) {
  fs.writeFile(fileName, data || '', (err) => {
    if(!err) return
    console.log(err)
  })
}

function rename(source, target) {
  fs.rename(source, target, (err) => {
    if(!err) return
    console.log(err)
  })
}

program.parse(process.argv)



