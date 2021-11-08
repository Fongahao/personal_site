/*
 Navicat Premium Data Transfer
 
 Source Server         : docker-mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:33061
 Source Schema         : react_blog
 
 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001
 
 Date: 04/11/2021 15:59:59
 */
SET
  NAMES utf8mb4;

SET
  FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;

CREATE TABLE `admin_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
BEGIN;

INSERT INTO
  `admin_user`
VALUES
  (1, 'fongahao', '123456');

COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `addtime` int NOT NULL,
  `view_count` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;

INSERT INTO
  `article`
VALUES
  (
    12,
    1,
    'docker',
    '## 数据持久化\n\n[volume-configuration-reference](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference)\n\n[云原生之Docker数据持久化实现](https://mp.weixin.qq.com/s/2YPcOPbyOfz5DHQSyyf-Dg)\n\n[挂载目录（bind mounts）和Volume是不同的](https://www.jianshu.com/p/23edfd959add)\n\n使用在docker-compose.yml 文件中 使用volumes\n\n```dockerfile\nvolumes:    # 数据持久化\n	- ../mysql/data:/var/lib/mysql\n```\n',
    '数据持久化',
    1635955200,
    1098
  );

INSERT INTO
  `article`
VALUES
  (
    14,
    1,
    'ENTRYPOINT 相关',
    '## ENTRYPOINT 相关\n\n### Docker run 命令、CMD指令和ENTRYPOINT指令\n\n参考：\n\n[CMD命令官方文档](https://docs.docker.com/engine/reference/builder/#cmd)\n\n[ENTRYPOINT命令官方文档](https://docs.docker.com/engine/reference/builder/#entrypoint)\n\n[【docker】CMD ENTRYPOINT 区别 终极解读！](https://blog.csdn.net/u010900754/article/details/78526443)\n\n[Dockerfile: ENTRYPOINT和CMD的区别](https://zhuanlan.zhihu.com/p/30555962)\n\n> CMD 和 ENTRYPOINT 的作用都是在容器启动之后指定需要运行的命令。\n\n> CMD 和 ENTRYPOINT 都有 shell 和 exec 两种格式，这个等下再讲，先知道如何使用他们。\n\n#### 前提\n\n- 会使用Dockerfile\n\n#### 举个例子\n\n##### CMD\n\n目录\n\n```\ndemo\n	Dockerfile\n```\n\n\n\nDockerfile内容\n\n```dockerfile\nFROM ubuntu:trusty\n\n# exec格式 第一个参数必须是命令的全路径\nCMD [\"/bin/ping\",\"localhost\"]\n```\n\n[CMD命令官方文档](https://docs.docker.com/engine/reference/builder/#cmd)\n\n构建镜像( cd 到 demo 目录下), 镜像名 pingdemo:v1\n\n- -t:  镜像名和标签\n\n```shell\n$ docker build -t pingdemo:v1 .\n```\n\n\n\n运行容器, 容器叫做 pingname1\n\n```shell\n$ docker run -it --name pingname1 pingdemo:v1\n\nPING localhost (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.036 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.057 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=3 ttl=64 time=0.095 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=4 ttl=64 time=0.101 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=5 ttl=64 time=0.044 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=6 ttl=64 time=0.286 ms\n64 bytes from localhost (127.0.0.1): icmp_seq=7 ttl=64 time=0.093 ms\n^C\n--- localhost ping statistics ---\n7 packets transmitted, 7 received, 0% packet loss, time 6143ms\nrtt min/avg/max/mdev = 0.036/0.101/0.286/0.079 ms\n```\n\n可以看到运行成功了\n\n\n\n按照这个逻辑，我再run一个名叫 pingname2 的容器，我想要保持容器保持运行 加上了 /bin/bash\n\n[docker run -it centos /bin/bash 后面的 bin/bash的作用](https://blog.csdn.net/persistencegoing/article/details/93713869)\n\n```shell\n$ docker run -it --name pingname2 pingdemo:v1 /bin/bash\n\nroot@c2fed38ead5b:/# \n```\n\n可以看到容器确实保持运行了，却没有ping localhost。 这是为什么呢？\n\n因为 CMD的命令 被/bin/bash 替换了，这就是许多文章中所说的 “覆盖（override）”\n\n##### ENTRYPOINT\n\n[ENTRYPOINT命令官方文档](https://docs.docker.com/engine/reference/builder/#entrypoint)\n\nENTRYPOINT 命令也可以被覆盖，但不建议这么做 --entrypoint 命令\n\n\n\n##### CMD+ENTRYPOINT\n\n既然 CMD命令和ENTRYPOINT 都是在容器启动之后执行的命令，那两者有啥子区别和联系呢？\n\n###### 区别\n\n> CMD: 一个默认命令，用于被覆盖（**The main purpose of a `CMD` is to provide defaults for an executing container.** ）\n>\n> ENTRYPOINT：最好不要被覆盖（An `ENTRYPOINT` allows you to configure a container that will run as an executable.）\n\n###### 联系\n\n当CMD，ENTRYPOINT一起使用时，那就很神奇了。\n\nCMD中的参数会被传入ENTRYPOINT命令中，当做ENTRYPOINT的参数\n\n```dockerfile\n# ENTRYPOINT [\"yarn\"]\n# CMD [\"start\" ]   \n# 相当于 ENTRYPOINT [\"yarn\",\"start\"]\nENTRYPOINT [\"yarn\",\"start\"]\n```\n\n###### 区别+联系\n\n> const theFinal = ENTRYPOINT  +  ( overRide|| CMD  )\n\n解释：最终命令 = ENTRYPOINT + docker run 后面跟着的命令 || CMD\n\n### find / -name \"docker-entrypoint.sh\"\n\n查找 docker-entrypoint.sh文件\n\n/usr/local/bin/docker-entrypoint.sh\n\n\n\n容器的启动脚本',
    '## ENTRYPOINT 相关',
    1635955200,
    1067
  );

COMMIT;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;

CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `orderNum` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;

INSERT INTO
  `type`
VALUES
  (1, '个人网站内容', 1);

INSERT INTO
  `type`
VALUES
  (2, '框架', 2);

INSERT INTO
  `type`
VALUES
  (3, 'JS基础', 3);

INSERT INTO
  `type`
VALUES
  (4, '计算机基础', 4);

COMMIT;

SET
  FOREIGN_KEY_CHECKS = 1;