#
# Place in /home/phohawkenics/deploy/phohawkenics
# with the home and static folder
#

if [ -d "./home" ] 
then
    echo "Directory ./home exists." 
else
    echo "Error: Directory ./home does not exists."
	exit 0
fi

if [ -d "./static" ] 
then
    echo "Directory ./static exists." 
else
    echo "Error: Directory ./static does not exists."
	exit 0
fi

pushd /home/phohawkenics/webapps/phohawkenics/apache2/bin
./stop
popd

echo 'Removing home and static'

rm -rf /home/phohawkenics/webapps/phohawkenics/phohawkenics/home
rm -rf /home/phohawkenics/webapps/phohawkenics/phohawkenics/static
#rm -rf /home/phohawkenics/webapps/static/phohawkenics/*

echo 'Copying home and static'

cp -R ./home /home/phohawkenics/webapps/phohawkenics/phohawkenics
cp -R ./static /home/phohawkenics/webapps/phohawkenics/phohawkenics

echo 'Collecting static files'

pushd /home/phohawkenics/webapps/phohawkenics/phohawkenics
python2.7 manage.py collectstatic
popd

rm -rf ./home
rm -rf ./static

pushd /home/phohawkenics/webapps/phohawkenics/apache2/bin
./start
popd

echo 'Success'

exit 0