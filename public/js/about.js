
/*Start date and end date function starts here*/
 var selectedBoards;
$(document).ready(function () {
    var minDate ;
    var maxDate;
    var mDate;
    
    var j = jQuery.noConflict();
    j( "#startTime" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
    onSelect: function abc() {
    minDate = j( "#startTime" ).datepicker("getDate");
    var mDate = new Date(minDate.setDate(minDate.getDate()));
    var maxDate = new Date(minDate.setDate(minDate.getDate() + 30));
j("#endTime").datepicker("setDate", maxDate);
j( "#endTime" ).datepicker( "option", "minDate", mDate);
j( "#endTime" ).datepicker( "option", "maxDate", maxDate);
}
});
var tdate = new Date();
var ddate = new Date(tdate.setDate(tdate.getDate() + 31));
j("#startTime").datepicker("setDate", new Date());
j( "#endTime" ).datepicker({
               showWeek:true,
               dateFormat:"mm/dd/yy",
               showAnim: "slide",
            });
j("#endTime").datepicker("setDate",ddate);

$('#Boards').multiselect({
    enableCaseInsensitiveFiltering: true,
    enableFiltering: true,
    allSelectedText:false,
    
    }); 

 $('#Boards').change(function(e) {
     var selected = $(e.target).val();
     selectedBoards= $(e.target).val();
        console.dir(selected);
    });

 });
 /*Start date and end date function ends here*/

 /*Function on boards starts here*/
var allData;
var SD;
var ED;
var BI;

$.get("/users/api/data", function(data, status){
	allData= data;
    var filteredData = [];
   SD="01/17/2020";
   ED="01/17/2020";
   BI=["01"];
console.log(allData);
console.log(SD);
console.log(ED);
console.log(BI);
console.log(filteredData);
    
readyToGo(allData,SD,ED,BI);
   
	});


function filteredTableData()
{
var startDateFiltered = document.getElementById("startTime").value;
var endDateFiltered = document.getElementById("endTime").value;
var board = document.getElementById("Boards").value;
SD=startDateFiltered;
ED=endDateFiltered;
BI=selectedBoards;
//console.log(BI);
    readyToGo(allData,SD,ED,BI);
}

/*function on boards end here*/

/*Ready to go function*/
function readyToGo(data,SD,ED,BI){

alert("click on ok to see data.");

var filteredData = [];
    
    for(i=0;i<data.length;i++)
    {
        for(j=0;j<BI.length;j++)
        {
             if(data[i].BoardId == BI[j] && data[i].Date >= SD  && data[i].Date <= ED)
        {
             filteredData.push(data[i]);
            
        }

        }

        }


    console.log(filteredData);
    
    var txt=""; 
            
      for (var x in filteredData) {
        
        txt += "<tr><td>"+ filteredData[x].Date + "</td><td>" + filteredData[x].Time + "</td><td>" + filteredData[x].UTC + "</td><td>" + filteredData[x].BoardId + "</td><td>" + filteredData[x].temp + "</td><td>" + filteredData[x].humidity + "</td><td>" + filteredData[x].lumVal + "</td><td>"+ filteredData[x].bavol + "</td><tr>"; 
      }
         
      document.getElementById("tBody").innerHTML=txt;
     
            var tim_data=[];
            var time_data=[]; 
            var date_data=[];
            var b_data=[];
            var tt_data=[];
            var hu_data=[];
            var lu_data=[];
            var allData=[];
            
            
            for (var i =0;i < filteredData.length; i++)
            {
                var times = filteredData[i].timestamp;
                var tims= filteredData[i].Time;
                var dates= filteredData[i].Date;
                var boards= filteredData[i].BoardId;
                var temps= filteredData[i].temp;
                var humis= filteredData[i].humidity;
                var lumis= filteredData[i].lumVal;
                var conc = dates.concat(tims);//concanating time and date
               
                tim_data.push(conc);
                time_data.push(tims);
                date_data.push(dates);
                b_data.push(boards);
                hu_data.push(humis);
                tt_data.push(temps);
                lu_data.push(lumis);

                console.log(b_data);
                
                

                
            }
/*function for boards ends here*/

/*function to download csv file from html table*/

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
        text: 'Temprature in 2020',
        
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
            text: 'Temprature'
        }
    },
    
    xAxis: {
        labels: {
            style: {
                color: 'white'
            }
        },
         categories: tim_data,

        
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
        return 'The Board <b>' + b_data[x] + '-' +this.series.name+ '</b> is <b>' + this.y + '</b> at <b>'+this.x;
    }

},
    series: [{
        name: 'Temprature',
        color:' #FF0000',
        data: 
            tt_data,

        }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                   
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});

      /*Container chart end to here*/

      /*container1 */
Highcharts.chart('container1', {
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
        text: 'Humidity in 2020'
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
            text: 'Humidity'
        }
    },

    xAxis: {
        labels: {
            style: {
                color: 'white'
            }
        },
        categories:  tim_data,
        
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
        style:{
            color:'#ffff'
        },
        name: 'Humidity',
        color: '#CCCC00',
         
        data:hu_data
   

    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});  


   Highcharts.chart('container2',  {
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
        text: 'Luminosity in 2020'
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
            text: 'Luminosity'
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
        style:{
            color:'#ffff'
        },
        name: 'Luminosity',
        data: lu_data
   

    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
});
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
    
            $("#tablecontentsensor").tableToCSV();
        }