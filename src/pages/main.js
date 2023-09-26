import React from 'react'

const Main = () => {
  return (
    <div id="main-content">
    <div className="container-fluid">
        <div className="block-header">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h2>Analytical</h2>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html"><i className="fa fa-dashboard"></i></a></li>                            
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item active">Analytical</li>
                    </ul>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="d-flex flex-row-reverse">
                        <div className="page_action">
                            <button type="button" className="btn btn-primary"><i className="fa fa-download"></i> Download report</button>
                            <button type="button" className="btn btn-secondary"><i className="fa fa-send"></i> Send report</button>
                        </div>
                        <div className="p-2 d-flex">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row clearfix row-deck">
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card number-chart">
                    <div className="body">
                        <span className="text-uppercase">New Sessions</span>
                        <h4 className="mb-0 mt-2">22,500 <i className="fa fa-level-up font-12"></i></h4>
                        <small className="text-muted">Analytics for last week</small>
                    </div>
                    <div className="sparkline" data-type="line" data-spot-Radius="0" data-offset="90" data-width="100%" data-height="50px"
                    data-line-Width="1" data-fill-Color="#73cec7">4,1,5,2,7,3,4</div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card number-chart">
                    <div className="body">
                        <span className="text-uppercase">Goal Completions</span>
                        <h4 className="mb-0 mt-2">1,12,500</h4>
                        <small className="text-muted">Analytics for last week</small>
                    </div>
                    <div className="sparkline" data-type="line" data-spot-Radius="0" data-offset="90" data-width="100%" data-height="50px"
                    data-line-Width="1"  data-fill-Color="#efc26b">1,4,2,3,6,2</div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card number-chart">
                    <div className="body">
                        <span className="text-uppercase">TIME ON SITE</span>
                        <h4 className="mb-0 mt-2">1,070</h4>
                        <small className="text-muted">Analytics for last week</small>
                    </div>
                    <div className="sparkline" data-type="line" data-spot-Radius="0" data-offset="90" data-width="100%" data-height="50px"
                    data-line-Width="1"  data-fill-Color="#84d4a6">1,4,2,3,1,5</div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card number-chart">
                    <div className="body">
                        <span className="text-uppercase">BOUNCE RATE</span>
                        <h4 className="mb-0 mt-2">10K</h4>
                        <small className="text-muted">Analytics for last week</small>
                    </div>
                    <div className="sparkline" data-type="line" data-spot-Radius="0" data-offset="90" data-width="100%" data-height="50px"
                    data-line-Width="1"  data-fill-Color="#7ea7de">1,3,5,1,4,2</div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card top_widget">
                    <div className="body">
                        <div className="icon"><i className="fa fa-flag"></i> </div>
                        <div className="content">
                            <div className="text mb-2 text-uppercase">Sessions</div>
                            <h4 className="number mb-0">3,251 <span className="font-12 text-muted"><i className="fa fa-level-up"></i> 13%</span></h4>
                            <small className="text-muted">Analytics for last week</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card top_widget">
                    <div className="body">
                        <div className="icon"><i className="fa fa-users"></i> </div>
                        <div className="content">
                            <div className="text mb-2 text-uppercase">Users</div>
                            <h4 className="number mb-0">25K <span className="font-12 text-muted"><i className="fa fa-level-down"></i> 7%</span></h4>
                            <small className="text-muted">Analytics for last week</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card top_widget">
                    <div className="body">
                        <div className="icon"><i className="fa fa-user"></i> </div>
                        <div className="content">
                            <div className="text mb-2 text-uppercase">VISITORS</div>
                            <h4 className="number mb-0">21K <span className="font-12 text-muted"><i className="fa fa-level-down"></i> 4%</span></h4>
                            <small className="text-muted">Analytics for last week</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card top_widget">
                    <div className="body">
                        <div className="icon"><i className="fa fa-thumbs-up"></i> </div>
                        <div className="content">
                            <div className="text mb-2 text-uppercase">LIKES</div>
                            <h4 className="number mb-0">53K <span className="font-12 text-muted"><i className="fa fa-level-up"></i> 15%</span></h4>
                            <small className="text-muted">Analytics for last week</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row clearfix row-deck">
            <div className="col-lg-12">
                <div className="card">
                    <div className="header">
                        <h2>Google Analytics Dashboard</h2>
                        <ul className="header-dropdown">
                            <li className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="javascript:void(0);">Action</a></li>
                                    <li><a href="javascript:void(0);">Another Action</a></li>
                                    <li><a href="javascript:void(0);">Something else</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <select className="custom-select custom-select-sm">
                                    <option>Open this select menu</option>
                                    <option defaultValue="1">Sessions</option>
                                    <option defaultValue="2">Users</option>
                                    <option defaultValue="3">Page Views</option>
                                    <option defaultValue="4">Bounce Rate</option>
                                    <option defaultValue="5">Location</option>
                                    <option defaultValue="6">Pages</option>
                                    <option defaultValue="7">Referrers</option>
                                    <option defaultValue="8">Searches</option>
                                    <option defaultValue="9">Technology</option>
                                    <option defaultValue="10">404 Errors</option>
                                </select>
                            </div>
                            <div className="d-flex">
                                <button type="button" className="btn btn-outline-primary mr-2"><i className="fa fa-download"></i> Download report</button>
                                <button type="button" className="btn btn-outline-secondary"><i className="fa fa-send"></i> Send report</button>
                            </div>                                
                        </div>
                        <div id="Google-Analytics-Dashboard" style={{height: "230px"}}></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="row clearfix row-deck">
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="header">
                        <h2>Use by Device</h2>
                        <ul className="header-dropdown">
                            <li className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="javascript:void(0);">Action</a></li>
                                    <li><a href="javascript:void(0);">Another Action</a></li>
                                    <li><a href="javascript:void(0);">Something else</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <div id="Use-by-Device" style={{height: "16rem"}}></div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="header">
                        <h2>Use by Audience</h2>
                        <ul className="header-dropdown">
                            <li className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="javascript:void(0);">Action</a></li>
                                    <li><a href="javascript:void(0);">Another Action</a></li>
                                    <li><a href="javascript:void(0);">Something else</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <div id="Use-by-Audience" style={{height: "16rem"}}></div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="card">
                    <div className="header">
                        <h2>Use by Browser</h2>
                        <ul className="header-dropdown">
                            <li className="dropdown">
                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="javascript:void(0);">Action</a></li>
                                    <li><a href="javascript:void(0);">Another Action</a></li>
                                    <li><a href="javascript:void(0);">Something else</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="body">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                  <th>Browser</th>
                                  <th>Sessions</th>
                                  <th>Bounce rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chrome</td>
                                    <td>23,233 <i className="fa fa-level-up"></i></td>
                                    <td>47.12%</td>
                                </tr>
                                <tr>
                                    <td>Firefox</td>
                                    <td>13,901 <i className="fa fa-level-up"></i></td>
                                    <td>33.02%</td>
                                </tr>
                                <tr>
                                    <td>Safari</td>
                                    <td>3,015 <i className="fa fa-level-up"></i></td>
                                    <td>24.12%</td>
                                </tr>
                                <tr>
                                    <td>Edge</td>
                                    <td>233 <i className="fa fa-level-down"></i></td>
                                    <td>17.33%</td>
                                </tr>
                                <tr>
                                    <td>Opera</td>
                                    <td>821 <i className="fa fa-level-down"></i></td>
                                    <td>7.12%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Main