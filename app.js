
document.getElementById('date').value=new Date().toISOString().slice(0,10);
let chart;
let pieChart;
function f(n){return Number(n).toLocaleString('vi-VN')+' đ';}
function calculate(){
const loan=+document.getElementById('loan').value||0;
const rate=(+document.getElementById('rate').value||0)/100;
const months=+document.getElementById('months').value||1;
const start=new Date(document.getElementById('date').value);
const principal=loan/months;
let balance=loan,totalInterest=0;
const body=document.querySelector('#tbl tbody');
body.innerHTML='';
const labels=[],data=[];
for(let i=1;i<=months;i++){
 const interest=balance*rate;
 const total=principal+interest;
 balance=Math.max(0,balance-principal);
 totalInterest+=interest;
 const d=new Date(start); d.setMonth(d.getMonth()+i);
 body.innerHTML += `<tr><td>${i}</td><td>${d.toLocaleDateString('vi-VN')}</td><td>${f(principal)}</td><td>${f(interest)}</td><td>${f(total)}</td><td>${f(balance)}</td></tr>`;
 labels.push('T'+i); data.push(Math.round(interest));
}
document.getElementById('totalInterest').innerText=f(totalInterest);
document.getElementById('totalPay').innerText=f(loan+totalInterest);
document.getElementById('monthlyPrincipal').innerText=f(principal);
if(chart) chart.destroy();

chart = new Chart(
    document.getElementById('chart'),
    {
        type:'line',
        data:{
            labels,
            datasets:[{
                label:'Tiền lãi',
                data,
                borderColor:'#2e7d32',
                tension:.4,
                fill:false
            }]
        }
    }
);

// PIE CHART
if(pieChart) pieChart.destroy();

pieChart = new Chart(
    document.getElementById('pieChart'),
    {
        type:'doughnut',
        data:{
            labels:['Tiền gốc','Tiền lãi'],
            datasets:[{
                data:[loan,totalInterest],
                backgroundColor:[
                    '#22c55e',
                    '#f97316'
                ],
                borderWidth:0
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{
                    position:'bottom'
                }
            }
        }
    }
);
}
calculate();
