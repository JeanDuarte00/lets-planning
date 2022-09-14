echo "=====================STOP APP============================"
sudo docker stop lets-planning

echo "=====================BUILDING============================"
sudo docker build -t jeanduarte00/lets_planning .

echo "=====================RUNNING============================="
sudo docker run --rm -d -p 3000:3000 -v $(pwd)/:/usr/src/app --name lets_planning jeanduarte00/lets_planning