var gr = new GlideRecord('cmdb_ci_server');
var gsuR = new GlideRecord('u_gsur_management');
var count = 0;

gr.query();

while (gr.next()) {
  count++;
  //gs.log('Here is a record:' + gr.name + '::' + gr.asset);
  if (gsuExists(gr) == 0) {
     //gs.log('does not exist:' + gr.name);
     gsuR.initialize();
     gsuR.u_name = gr.name;
     gsuR.u_ci_name = gr.sys_id;
     gsuR.u_asset_name = gr.asset;
     gsuR.u_source_location = gr.location;
     gsuR.insert();
  } else {
     gsuR.initialize();
     gsuR.get('u_ci_name', gr.sys_id);
     gs.log('found the record to update:' + gsuR.u_ci_name.name);
     //gs.log('This is the location:' + gr.location.name);

     gsuR.setValue('u_source_location', gr.location);
     gsuR.setValue('u_ci_status', gr.install_status);
     gsuR.update();
     //gs.log('exists:' + gr.name);
  }
  //if (count > 3) {
  //   break;
  //}
}

function gsuExists(ci) {
var gr = new GlideRecord('u_gsur_management');

   gr.addQuery('u_ci_name', ci.sys_id.toString());
   //gs.log('This is the CI Im searching for:' + ci);
   gr.query();

   if (gr.next()) {
      //gs.log('FOUND');
      return 1;
   } else {
      //gs.log('NOT FOUND');
      return 0;
   }


}
