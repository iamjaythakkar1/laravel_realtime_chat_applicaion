<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = [
            'user' => Auth::user()->name,
            'content' => $request->input('content'),
            'id' => uniqid()
        ];

        // Logic to broadcast the message will go here

        return response()->json($message);
    }
}
