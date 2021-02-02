# -b -n name1 --name name1 -p path1 --path path1
# set -- $(getopt -o bn:p: -l name,path -- "$@")
set -- $(getopt -q bn:p: "$@")


while [ -n "$1" ]
do
  case "$1" in
    -b)
      echo "发现 -b 参数"
      ;;
    -n|--name)
      echo "发现 -n|--name 参数";
      echo "-n|--name 的值为 $2";
      shift
      ;;
    -p|--path)
      echo "发现 -p|--path 参数";
      echo "-p|--path 的值为 $2"
      shift
      ;;
    *)
      echo "$1 为不明参数"
      ;;
  esac
  shift
done
