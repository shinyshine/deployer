#!/bin/bash
set -- $(getopt -q n:p: "$@")

# 参数处理
while [ -n "$1" ]
do
  case "$1" in
    -n|--name)
      echo "仓库名称为： $2";
      GIT_NAME=$2
      shift
      ;;
    -p|--path)
      echo "仓库地址为： $2"
      GIT_PATH=$2
      shift
      ;;
    *)
      echo "$1 为不明参数"
      ;;
  esac
  shift
done

# 拉取代码
if [ $GIT_PATH ]; then
  git clone -b dev $GIT_PATH .
  gitStatus=$?
  if [ $gitStatus -eq 0 ]; then
    echo '代码检出成功✅✅✅，开始安装依赖'
    cd ./$GIT_NAME
    pwd
  else
    echo '拉取代码出错❌❌❌'
  fi

else
  echo "git仓库地址不规范"
fi




exit $gitStatus



# 如何判断代码已经拉取完成
