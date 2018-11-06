import { HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
declare var jQuery: any;
export function getToken() {
  return localStorage.getItem("authToken");
}

export function setToken(token: string) {
  return localStorage.setItem("authToken", token);
}

export function getHttpHeaders() {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    Origin: "header"
  };
  if (token) {
    headers["JSESSIONID"] = token;
  }
  const httpHeaders = new HttpHeaders(headers);
  return httpHeaders;
}

export function appendSession(url) {
  const token = getToken();
  return `${url};jsessionid=${token}`;
}

export function showOrHideLoading(isShow) {
  if (isShow) {
    jQuery("#loader_modal")
      .modal({ backdrop: "static", keyboard: false })
      .modal("show");
  } else {
    setTimeout(() => {
      jQuery("#loader_modal").modal("hide");
    }, 1000);
  }
}

export function showToastMessage(msg, type) {
  jQuery.notify(
    {
      message: msg
    },
    {
      element: "body",
      position: null,
      allow_dismiss: true,
      delay: 2000,
      type: type === "error" ? "danger" : type
    }
  );
}

export function showConfirmDialog(title, text, type, calBack) {
  Swal({
    title: title ? title : "Are you sure?",
    text: text ? text : "",
    type: type,
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then(result => {
    if (result.value) {
      calBack(true);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      calBack(false);
    }
  });
}
