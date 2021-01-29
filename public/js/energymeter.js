/*Start date and end date function starts here*/
 var selectedBoards;
$(document).ready(function () {
    var minDate1 ;
    var maxDate1;
    var mDate1;
    
    var j = jQuery.noConflict();
    j( "#startTime1" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
    onSelect: function abc() {
    var minDate = j( "#startTime1" ).datepicker("getDate");
    var mDate = new Date(minDate.setDate(minDate.getDate()));
    console.log(mDate);
    var maxDate = new Date(minDate.setDate(minDate.getDate() + 30));
    console.log(maxDate);
j("#endTime1").datepicker("setDate", maxDate);
j("#endTime1").datepicker( "option", "minDate1", mDate);
j("#endTime1").datepicker( "option", "maxDate1", maxDate);
} 
});
var tdate1 = new Date();
var ddate1 = new Date(tdate1.setDate(tdate1.getDate() + 31));
j("#startTime1").datepicker("setDate", new Date());
j( "#endTime1" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
            });
j("#endTime1").datepicker("setDate",ddate1);

$('#Boards1').multiselect({
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    allSelectedText:false,
    
    }); 

 $('#Boards1').change(function(e) {
     var selected1 = $(e.target).val();
     selectedBoards= $(e.target).val();
        console.dir(selected1);
    });

 });
 /*Start date and end date function ends here*/

 /*Function on boards starts here*/
var allData1;
var SD1;
var ED1;
var BI1;

$.get("/users/api/data1", function(data1, status){
  allData1= data1;
  var filteredData1 = [];
  SD1="02/17/2020";
  ED1="02/17/2020";
  BI1=["124"];
console.log(allData1);
console.log(SD1);
console.log(ED1);
console.log(BI1);
console.log(filteredData1);
    
readyToGo(allData1,SD1,ED1,BI1);
   
  });

function filteredTableData()
{
var startDateFiltered = document.getElementById("startTime1").value;
var endDateFiltered = document.getElementById("endTime1").value;
var board = document.getElementById("Boards1").value;
SD1=startDateFiltered;
ED1=endDateFiltered;
BI1=selectedBoards;
console.log(BI1);
    readyToGo(allData1,SD1,ED1,BI1);
}

/*function on boards end here*/

/*Ready to go function*/
function readyToGo(data1,SD1,ED1,BI1){

alert("click on ok to see data.");

var filteredData1 = [];
    
    for(i=0;i<data1.length;i++)
    {
        for(j=0;j<BI1.length;j++)
        {
             if(data1[i].Box_Id == BI1[j] && data1[i].Date >= SD1  && data1[i].Date <= ED1)
        {
             filteredData1.push(data1[i]);
            
        }  
        }
       

    }
    console.log(filteredData1);
     var txt1=""; 
            
      for (var x in filteredData1) {

         txt1 += "<tr><td>"+ filteredData1[x].Date + "</td><td>" + filteredData1[x].Time + "</td><td>" + filteredData1[x].UTC + "</td><td>" + filteredData1[x].Box_Id + "</td><td>" + filteredData1[x].Active_Power + "</td><td>" + filteredData1[x].Energy + "</td><tr>"; 
        
    }
      document.getElementById("tBody").innerHTML=txt1;
      // $('.Mrudula tbody').html(txt1);

      var time_data=[]; 
      var date_data=[];
      var b_data=[];
      var ap_data=[];
      var ene_data=[];



  for (var i =0;i < filteredData1.length; i++)
  {


    var tim = filteredData1[i].Time;
    var dates = filteredData1[i].Date;
    var boxid = filteredData1[i].Box_Id;
    var activepower = parseFloat(filteredData1[i].Active_Power);
    var energy = parseFloat(filteredData1[i].Energy);


    time_data.push(tim);
    date_data.push(dates);
    b_data.push(boxid);
    ap_data.push(activepower);
    ene_data.push(energy);

    
    console.log(ene_data);

      /*Code for container chart*/

      Highcharts.chart('container', {
                    chart:{
                        zoomType: 'xy',
                         height: (9 / 25 * 100) + '%',
                         backgroundColor:'#000'
                    },
                     credits: {
        enabled: false
    },

    exporting: {
    enabled: false
  },
                    

    title: {
      style:{
            color:'#ffff'
        },
        text: 'Active power for Energy Meter'
    },
    yAxis: {labels: {
            style: {
                color: 'white'
            }
        },
          
        title: {
          style:{
            color:'#ffff'
        },
            text: 'Active_power'
        }
    },
    xAxis: {
      labels: {
            style: {
                color: 'white'
            }
        },
         categories:  date_data,
        
            title: {
              style:{
            color:'#ffff'
        },
                text: 'Date',

            },
    },
    legend: {
        itemStyle: {
          color:'white'
        },
        layout: 'bottom',
        align: 'center',
        verticalAlign: 'bottom',
        //backgroundColor:'#fff'
    },
      tooltip: {
    formatter: function() {
        return 'The Board <b>' + b_data[x] + '-' +this.series.name+ '</b> is <b>' + this.y + '</b> at <b>'+ date_data[x]+ ','+time_data[x] ;
    }

},
    series: [{
        name: 'Active_power',
        data: ap_data
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'bottom',
                    align: 'center',
                    verticalAlign: 'bottom',
        backgroundColor:'#fff'
                }
            }
        }]
    }

});


      /*Container chart end to here*/
//  /*Code for container1 chart*/
Highcharts.chart('container1', {
                    chart:{
                        zoomType: 'xy',
                         height: (2.3 / 12 * 100) + '%',
                         backgroundColor:'#000'
                    },
                     credits: {
        enabled: false
    },

    exporting: {
    enabled: false
  },
                  

    title: {
      style:{
            color:'#ffff'
        },
        text: 'Energy for meters'
    },

    

    yAxis: {
      labels: {
            style: {
                color: 'white'
            }
        },
        title: {
          style:{
            color:'#ffff'
        },
            text: 'Energy'
        }
    },

    xAxis: {
      labels: {
            style: {
                color: 'white'
            }
        },
        categories:  date_data,
        
            title: {
              style:{
            color:'#ffff'
        },
                text: 'Date',

            },
        
    },

    legend: {
      itemStyle: {
        color:'white'
        },
        layout: 'bottom',
        align: 'center',
        verticalAlign: 'bottom',
        //backgroundColor:'#fff'
    },

    
    tooltip: {
    formatter: function() {
        return 'The Board <b>' + b_data[x] + '-' +this.series.name+ '</b> is <b>' + this.y + '</b> at <b>'+ date_data[x]+ ','+time_data[x] ;
    }

},

    series: [{
        name: 'Energy',
        color:' #FF0000',
        data:ene_data
   

    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'bottom',
                    align: 'center',
                    verticalAlign: 'bottom',
                    backgroundColor:'#fff'
  
                }
            }
        }]
    }

});  

      /*Container1 chart end to here*/
 
}
}
/****************************************************
*                    TABLE TO CSV                   *
*****************************************************/


jQuery.fn.tableToCSV = function() {
    
    var clean_text = function(text){
        text = text.replace(/"/g, '\\"').replace(/'/g, "\\'");
        return '"'+text+'"';
    };
    
  $(this).each(function(){
      var table = $(this);
      var caption = $(this).find('caption').text();
      var title = [];
      var rows = [];

      $(this).find('tr').each(function(){
        var data = [];
        $(this).find('th').each(function(){
                    var text = clean_text($(this).text());
          title.push(text);
          });
        $(this).find('td').each(function(){
                    var text = clean_text($(this).text());
          data.push(text);
          });
        data = data.join(",");
        rows.push(data);
        });
      title = title.join(",");
      rows = rows.join("\n");

      var csv = title + rows;
      var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      var download_link = document.createElement('a');
      download_link.href = uri;
      //var ts = new Date().getTime();
      var ts = "table";
      if(caption==""){
        download_link.download = ts+".csv";
      } else {
        download_link.download = caption+"-"+ts+".csv";
      }
      document.body.appendChild(download_link);
      download_link.click();
      document.body.removeChild(download_link);
  });
    
};
        function Export() {
    
            $("#tableContentenergy").tableToCSV();
        }
    /****************************************************
*                    TABLE TO CSV end here                *
*****************************************************/
