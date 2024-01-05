import {Component, OnInit} from '@angular/core';
import {OnExit} from "../../../guards/exit.guard";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {


  onExit() {
    return Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
      return false
    })
  }


}
