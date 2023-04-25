function cidrToNetmask(cidr) {
  let netmask = '';
  for (let i = 0; i < 4; i++) {
    let octet = 0;
    if (cidr >= 8) {
      octet = 255;
      cidr -= 8;
    } else if (cidr > 0) {
      octet = 256 - Math.pow(2, 8 - cidr);
      cidr = 0;
    }
    netmask += octet + (i < 3 ? '.' : '');
  }
  return netmask;
}

function cidrToWildcard(cidr) {
  let wildcard = '';
  for (let i = 0; i < 4; i++) {
    let octet = 0;
    if (cidr >= 8) {
      octet = 0;
      cidr -= 8;
    } else if (cidr > 0) {
      octet = 256 - Math.pow(2, 8 - cidr);
      cidr = 0;
    } else {
      octet = 255;
    }
    wildcard += octet + (i < 3 ? '.' : '');
  }
  return wildcard;
}

function cidrToNetwork(cidr, ip) {
  let network = '';
  let ipOctets = ip.split('.');
  for (let i = 0; i < 4; i++) {
    let octet = parseInt(ipOctets[i]) & parseInt(cidrToNetmask(cidr).split('.')[i]);
    network += octet + (i < 3 ? '.' : '');
  }
  return network;
}

function cidrToBroadcast(cidr, ip) {
  let broadcast = '';
  let ipOctets = ip.split('.');
  for (let i = 0; i < 4; i++) {
    let octet = parseInt(ipOctets[i]) | parseInt(cidrToWildcard(cidr).split('.')[i]);
    broadcast += octet + (i < 3 ? '.' : '');
  }
  return broadcast;
}

function cidrToRange(cidr, ip) {
  let network = cidrToNetwork(cidr, ip);
  let broadcast = cidrToBroadcast(cidr, ip);
  return network + ' - ' + broadcast;
}

//Example:
//console.log(cidrToNetmask(24)); // Output: "255.255.255.0"
//console.log(cidrToWildcard(24)); // Output: "0.0.0.255"
//console.log(cidrToNetwork(24, '192.168.1.100')); // Output: "192.168.1.0"
//console.log(cidrToBroadcast(24, '192.168.1
