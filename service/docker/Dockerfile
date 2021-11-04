# FROM node:alpine 指定版本 之前会出现错误 
# Uncaught Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/request' is not defined by "exports" in /.../node_modules/egg-core/node_modules/koa/package.json
FROM node:12-alpine

# 配置环境变量
ENV NODE_ENV production

# 这个是容器中的文件目录
# RUN mkdir -p /usr/src/app 

# 设置工作目录
WORKDIR /usr/src/service

# 拷贝package.json文件到工作目录
# !!重要：package.json需要单独添加。
# Docker在构建镜像的时候，是一层一层构建的，仅当这一层有变化时，重新构建对应的层。
# 如果package.json和源代码一起添加到镜像，则每次修改源码都需要重新安装npm模块，这样木有必要。
# 所以，正确的顺序是: 添加package.json；安装npm模块；添加源代码。
COPY package.json /usr/src/service/package.json

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm i --production --registry=https://registry.npm.taobao.org

# 拷贝所有源代码到工作目
COPY . /usr/src/service

# 暴露容器端口
EXPOSE 9002

# 要明白 CMD 和 ENTRYPOINT 命令的区别，以及配合使用的作用
# ENTRYPOINT ["yarn"]
# CMD ["start" ]   
# CMD ["yarn","start"]
ENTRYPOINT ["yarn","start"]