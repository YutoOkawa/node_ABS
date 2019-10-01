import sys,json
from MathABS import ABS
from charm.toolbox.pairinggroup import PairingGroup

def main():
    group = PairingGroup('MNT159')
    absinst = ABS(group)
    data = json.loads(sys.stdin.readline())
    tpk = absinst.decodestr(data['tpk'])
    apk = absinst.decodestr(data['apk'])
    lam = absinst.decodestr(data['sign'])
    message = data['message']
    policy = data['policy']
    result = absinst.verify((tpk,apk),lam,message,policy)
    response = {"result":result}
    print(json.dumps(response))

if __name__ == "__main__":
    main()