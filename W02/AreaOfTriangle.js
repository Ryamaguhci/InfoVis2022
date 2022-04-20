function AreaOfTriangle(v1,v2,v3){
    var ab = (v2.x - v1.x)**2 + (v2.y - v1.y)**2 +(v2.z - v1.z)**2
    var ac = (v3.x - v1.x)**2 + (v3.y - v1.y)**2 +(v3.z - v1.z)**2
    var dot = (v2.x - v1.x) * (v3.x - v1.x) + (v2.y - v1.y) * (v3.y - v1.y) + (v2.z - v1.z) * (v3.z - v1.z)

    return ((ab*ac - (dot)**2)**(1/2)) / 2
}