var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'123',
  description: 'Apenas uma descrição',
  script: 'C:\\xampp\\htdocs\\P2P_Data\\server.js'
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();