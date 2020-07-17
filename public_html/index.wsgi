#!/home/c/cp36696/myenv/bin/python3
activate_this = '/home/c/cp36696/myenv/bin/activate_this.py'
#execfile(activate_this, dict(__file__=activate_this))
exec(open(activate_this).read())
import sys

sys.path.insert(0, '/home/c/cp36696/here_hack_2020/public_html/')
sys.path.insert(1, '/home/c/cp36696/myenv/lib/python3.4/site-packages/')
from seti import seti as application